import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PriceFormatPipe } from '../../pipes/price/price-format.pipe';
import { TimeFormatPipe } from '../../pipes/time/time-format.pipe';
import { UserService } from '../../services/user.service';
import { AppointmentService } from '../../services/appointment.service';
import { DeviceService } from '../../services/device.service';
import { ServiceTypeService } from '../../services/service-type.service';
import { interval } from 'rxjs';
import { MatTable, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressBarModule,
    PriceFormatPipe,
    TimeFormatPipe,
    MatTableModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})

export class ProfileComponent implements OnInit {
  loggedInUser: any = null;
  appointments: any[] = [];
  devices: any[] = [];
  serviceTypes: any[] = [];
  now: Date = new Date();

  constructor(
    private userService: UserService,
    private appointmentService: AppointmentService,
    private deviceService: DeviceService,
    private serviceTypeService: ServiceTypeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
        interval(1000).subscribe(() => {
          this.now = new Date();
          this.cdr.markForCheck();
          if (this.now.getSeconds() === 0) {
            this.checkAndUpdateStatuses();
          }
        });
  }

  loadData() {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
      this.userService.getUserById(loggedInUserId).then((docSnap) => {
        if (docSnap.exists()) {
          this.loggedInUser = { id: docSnap.id, ...docSnap.data() };
        }
      });
    }

    this.appointmentService.getAllAppointments().subscribe((appointments) => {
      this.appointments = appointments;
    });
    this.deviceService.getAllDevices().subscribe((devices) => {
      this.devices = devices;
    });
    this.serviceTypeService.getAllServiceTypes().subscribe((serviceTypes) => {
      this.serviceTypes = serviceTypes;
    });
  }

  checkAndUpdateStatuses() {
    const now = new Date();
    this.getUserAppointments().forEach(appointment => {
      if (appointment.status === 'folyamatban') {
        const endDate = new Date(appointment.dateObj);
        endDate.setMinutes(endDate.getMinutes() + appointment.duration);
        if (now > endDate) {
          this.appointmentService.updateAppointment(appointment.id, { status: 'befejezve' });
        }
      }
    });
  }

  getUserAppointments(): any[] {
    if (!this.loggedInUser) return [];
    return this.appointments
      .filter((appointment) => appointment.userId === this.loggedInUser.id)
      .map((appointment) => {
        const service = this.serviceTypes.find((st) => st.id === appointment.serviceId);
        const device = this.devices.find((d) => d.id === appointment.deviceId);
        return {
          ...appointment,
          date: appointment.date.toDate().toLocaleDateString('hu-HU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          }),
          status: appointment.status || 'Ismeretlen állapot',
          name: service?.name || 'Ismeretlen szolgáltatás',
          price: service?.price || 0,
          duration: service?.duration || 0,
          brand: device?.brand || 'Ismeretlen eszköz',
          model: device?.model || 'Ismeretlen modell',
          dateObj: appointment.date.toDate ? appointment.date.toDate() : new Date(appointment.date),
        };
      });
  }

  getRemainingTime(appointment: any): string {
    const now = this.now
    const start = new Date(appointment.date);
    const durationMinutes = appointment.duration || 90;

    if (now < start) {
      return 'Még nem kezdődött el';
    }

    const elapsedMs = now.getTime() - start.getTime();
    const elapsedMinutes = Math.floor(elapsedMs / 60000);

    if (elapsedMinutes >= durationMinutes) {
      return 'lejárt';
    }

    const remainingMinutes = durationMinutes - elapsedMinutes;
    const remainingSeconds = 59 - now.getSeconds();
    const min = remainingMinutes - 1 >= 0 ? remainingMinutes - 1 : 0;
    const sec = remainingSeconds >= 0 ? remainingSeconds : 0;

    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }

  confirmDelete(appointment: any) {
  if (confirm('Biztosan törlöd ezt az időpontot?')) {
    this.appointmentService.deleteAppointment(appointment.id).then(() => {
      this.loadData();
    });
  }
}
}