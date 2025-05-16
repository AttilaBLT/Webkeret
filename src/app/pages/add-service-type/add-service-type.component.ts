import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { PriceFormatPipe } from '../../pipes/price/price-format.pipe';
import { TimeFormatPipe } from '../../pipes/time/time-format.pipe';
import { ServiceTypeService } from '../../services/service-type.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-service-type',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    PriceFormatPipe,
    TimeFormatPipe
  ],
  templateUrl: './add-service-type.component.html',
  styleUrls: ['./add-service-type.component.scss']
})
export class AddServiceTypeComponent implements OnInit {
  serviceTypeForm: FormGroup;
  serviceTypes: any[] = [];
  displayedColumns: string[] = ['name', 'price', 'duration', 'actions'];
  editedServiceType: any = null;

  constructor(
    private fb: FormBuilder,
    private serviceTypeService: ServiceTypeService
  ) {
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
    this.serviceTypeService.getAllServiceTypes().subscribe({
      next: (data) => {
        this.serviceTypes = data;
      },
      error: (err) => {
        console.error('Hiba a szerviz típusok betöltésekor:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.serviceTypeForm.invalid) {
      return;
    }

    const newServiceType = {
      name: this.serviceTypeForm.value.name,
      price: this.serviceTypeForm.value.price,
      duration: this.serviceTypeForm.value.duration
    };

    this.serviceTypeService.addServiceType(newServiceType).then(() => {
      this.serviceTypeForm.reset();
      this.loadData();
    });
  }

  editServiceType(service: any) {
    this.editedServiceType = { ...service };
  }

  saveEdit(service: any) {
    if (!this.editedServiceType) return;
    this.serviceTypeService.updateServiceType(this.editedServiceType.id, {
      name: this.editedServiceType.name,
      price: this.editedServiceType.price,
      duration: this.editedServiceType.duration
    }).then(() => {
      this.editedServiceType = null;
      this.loadData();
    });
  }

  confirmDelete(service: any) {
    if (confirm('Biztosan törlöd ezt a szerviz típust?')) {
      this.serviceTypeService.deleteServiceType(service.id).then(() => {
        this.loadData();
      });
    }
  }
}