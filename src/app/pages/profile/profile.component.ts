import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';
import { Device, ServiceType } from '../../interfaces';
import { PriceFormatPipe } from '../../pipes/price/price-format.pipe';
import { TimeFormatPipe } from '../../pipes/time/time-format.pipe';

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
    HttpClientModule,
    PriceFormatPipe,
    TimeFormatPipe
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  users: any[] = [];
  appointments: any[] = [];
  serviceTypes: any[] = [];
  devices: Device[] = [];
  selectedIndex: number = 0;
  loggedInUser: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.http.get<any>('assets/dummy-data.json').subscribe({
      next: (data) => {
        this.users = data.users;
        this.appointments = data.appointments;
        this.devices = data.devices;
        this.serviceTypes = data.serviceTypes;

        const loggedInUserId = Number(localStorage.getItem('loggedInUserId'));
        this.loggedInUser = this.users.find((user) => user.id === loggedInUserId);
      },
      error: (err) => {
        console.error('Hiba az adatok betöltésekor:', err);
      }
    });
  }

  getUserAppointments(): any[] {
    if (!this.loggedInUser) return [];
    return this.appointments.filter((appointment) => appointment.userId === this.loggedInUser.id)
    .map((appointment) => {
      const service = this.serviceTypes.find((st) => st.id === appointment.serviceId);
      return {
        ...appointment,
        name: service?.name || 'Ismeretlen szolgáltatás',
        price: service?.price || 0,
        duration: service?.duration || 0
      };
    })
    .map((appointment) => {
      const device = this.devices.find((d) => d.id === appointment.deviceId);
      return {
        ...appointment,
        brand: device?.brand || 'Ismeretlen eszköz',
        model: device?.model || 'Ismeretlen modell'
      };
    });
  }

  reload(index: number): void {
    this.selectedIndex = index;
  }
}