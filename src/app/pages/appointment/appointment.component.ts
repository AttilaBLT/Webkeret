import { Component, OnInit } from '@angular/core';
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
    CommonModule
  ]
})
export class AppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  devices: Device[] = [];
  serviceTypes: ServiceType[] = [];
  phoneBrands: string[] = ['iPhone', 'Samsung'];
  filteredModels: Device[] = [];
  selectedBrand: string = '';

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private deviceService: DeviceService,
    private serviceTypeService: ServiceTypeService
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
    this.initializeForm();
    this.loadDevices();
    this.loadServiceTypes();
  }

  initializeForm() {
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

  loadDevices() {
    this.devices = [
      { id: 1, type: 'Phone', brand: 'iPhone', model: '15', userId: 1 },
      { id: 2, type: 'Phone', brand: 'iPhone', model: '14', userId: 1 },
      { id: 3, type: 'Phone', brand: 'iPhone', model: '13', userId: 1 },
      { id: 4, type: 'Phone', brand: 'iPhone', model: '12', userId: 1 },
      { id: 5, type: 'Phone', brand: 'Samsung', model: 'Galaxy S21', userId: 1 },
      { id: 6, type: 'Phone', brand: 'Samsung', model: 'Galaxy Note 20', userId: 1 },
    ];

    this.filteredModels = this.devices;
  }

  loadServiceTypes() {
    this.serviceTypes = [
      { id: 1, name: 'Kijelző csere', price: 50000, duration: 120 },
      { id: 2, name: 'Akkumulátor csere (utángyártott)', price: 15000, duration: 60 },
      { id: 3, name: 'Akkumulátor csere (gyári)', price: 20000, duration: 60 }
    ];
  }

  filterModelsByBrand(brand: string) {
    this.filteredModels = this.devices.filter(device => device.brand === brand);
    if (!this.filteredModels.some(device => device.model === this.appointmentForm.value.model)) {
      this.appointmentForm.get('model')?.setValue('');
    }
  }

  onSubmit() {
    if (this.appointmentForm.invalid) {
      return;
    }

    const selectedDate: Date = new Date(this.appointmentForm.value.date);
    const timeValue: Date = this.appointmentForm.value.time;

    if (!(timeValue instanceof Date)) {
      console.error('Hibás időformátum:', timeValue);
      return;
    }
  
    selectedDate.setHours(timeValue.getHours(), timeValue.getMinutes());

    const appointment: Appointment = {
      id: Math.random(),
      userId: 1,
      deviceId: this.appointmentForm.value.model,
      serviceId: this.appointmentForm.value.serviceId,
      date: selectedDate.toLocaleString('hu-HU'),
      status: 'pending'
    };

    console.log('Időpont foglalás adatai:', appointment);
    alert('Időpontfoglalás sikeresen megtörtént!');
  }
}