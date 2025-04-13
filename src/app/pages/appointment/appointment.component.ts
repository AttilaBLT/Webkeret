import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import { DeviceService } from '../../services/device.service';
import { ServiceTypeService } from '../../services/service-type.service';
import { Device } from '../../interfaces/devices.interface';
import { ServiceType } from '../../interfaces/service-type.interface';
import { Appointment } from '../../interfaces/appointment.interface';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTimepickerModule} from '@angular/material/timepicker';
import {MatInput} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { PriceFormatPipe } from '../../pipes/price/price-format.pipe';
import { TimeFormatPipe } from '../../pipes/time/time-format.pipe';
import { MatNativeDateModule } from '@angular/material/core';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
  imports: [
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTimepickerModule,
    MatInput,
    ReactiveFormsModule,
    MatButtonModule,
    PriceFormatPipe,
    TimeFormatPipe,
    MatNativeDateModule,
    MatOptionModule,
    CommonModule,
    HttpClientModule,
  ]
})
export class AppointmentComponent implements OnInit {
  @Output() appointmentsEvent = new EventEmitter<Appointment>();

  appointmentForm: FormGroup;
  devices: Device[] = [];
  serviceTypes: ServiceType[] = [];
  appointments: Appointment[] = [];
  phoneBrands: string[] = [];
  filteredModels: Device[] = [];
  loggedInUserId: number = 0;
  selectedBrand: string | null = null;
  availableTimes: string[] = [];

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private deviceService: DeviceService,
    private serviceTypeService: ServiceTypeService,
    private http: HttpClient
  ) { 
    this.appointmentForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      serviceId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loggedInUserId = Number(localStorage.getItem('loggedInUserId'));
    this.initializeForm();
    this.loadData();
  }

  initializeForm(): void {
    this.appointmentForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      brand: ['', Validators.required],
      model: [{ value: '', disabled: true }, Validators.required],
      serviceId: ['', Validators.required]
    });

    this.appointmentForm.get('brand')?.valueChanges.subscribe(brand => {
      this.selectedBrand = brand;
      this.filterModelsByBrand(brand);

      const modelControl = this.appointmentForm.get('model');

      if(brand) {
        modelControl?.enable();
      } else {
        modelControl?.disable();
      }
    });
  }

  loadData(): void {
    this.http.get<any>('assets/dummy-data.json').subscribe({
      next: (data) => {
        this.devices = data.devices;
        this.serviceTypes = data.serviceTypes;
        this.appointments = data.appointments;
        this.phoneBrands = [...new Set(this.devices.map((device) => device.brand))];
      },
      error: (err) => {
        console.error('Hiba az adatok betöltésekor:', err);
      }
    });
  }

  filterModelsByBrand(brand: string) {
    this.filteredModels = this.devices.filter(device => device.brand === brand);
    if (!this.filteredModels.some(device => device.model === this.appointmentForm.value.model)) {
      this.appointmentForm.get('model')?.setValue('');
    }
  }

  onBrandChange(event: any): void {
    const selectedBrand = event.value;
    this.selectedBrand = selectedBrand;
    this.filteredModels = this.devices.filter((device) => device.brand === selectedBrand);

    const modelControl = this.appointmentForm.get('model');
    if (selectedBrand) {
      modelControl?.enable();
    } else {
      modelControl?.disable();
      modelControl?.reset();
    }
  }

  onSubmit(): void {
    if (this.appointmentForm.invalid) {
      return;
    }
  
    const selectedDate: Date = new Date(this.appointmentForm.value.date);
    const selectedTime: string = this.appointmentForm.value.time;
    const [hourse, minutes] = selectedTime.split(':').map(Number);
    selectedDate.setHours(hourse, minutes, 0, 0);

    const deviceId = this.appointmentForm.value.model;
    const selectedDevice = this.devices.find((device) => device.id === deviceId);

    const appointmentData = {
      date: selectedDate.toLocaleString('hu-HU'),
      brand: this.appointmentForm.value.brand,
      model: this.appointmentForm.value.model,
      serviceId: this.appointmentForm.value.serviceId,
      userId: this.loggedInUserId,
    };

    if (!selectedDevice) {
      alert('A kiválasztott eszköz nem található!');
      return;
    }

    console.log('Kibocsátott időpont:', appointmentData);
  
    alert('Időpontfoglalás sikeresen megtörtént!');
  }
}