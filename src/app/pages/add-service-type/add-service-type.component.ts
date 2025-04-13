import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceType } from '../../interfaces/service-type.interface';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { PriceFormatPipe } from '../../pipes/price/price-format.pipe';
import { TimeFormatPipe } from '../../pipes/time/time-format.pipe';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-service-type',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    PriceFormatPipe,
    TimeFormatPipe,
    HttpClientModule
  ],
  templateUrl: './add-service-type.component.html',
  styleUrls: ['./add-service-type.component.scss']
})
export class AddServiceTypeComponent implements OnInit {
  @Output() serviceTypeAdded = new EventEmitter<ServiceType>();
  serviceTypeForm: FormGroup;
  serviceTypes: ServiceType[] = [];
  displayedColumns: string[] = ['name', 'price', 'duration'];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.serviceTypeForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      duration: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.http.get<{ serviceTypes: ServiceType[] }>('assets/dummy-data.json').subscribe({
      next: (data) => {
        this.serviceTypes = data.serviceTypes;
        console.log('Szerviz típusok betöltve:', this.serviceTypes);
      },
      error: (err) => {
        console.error('Hiba az adatok betöltésekor:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.serviceTypeForm.invalid) {
      return;
    }

    const newServiceType: ServiceType = {
      id: Math.random(),
      name: this.serviceTypeForm.value.name,
      price: this.serviceTypeForm.value.price,
      duration: this.serviceTypeForm.value.duration
    };

    this.serviceTypes = [...this.serviceTypes, newServiceType];
    this.serviceTypeAdded.emit(newServiceType);
    this.serviceTypeForm.reset();
  }
}
