import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { DeviceService } from '../../services/device.service';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-device',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss']
})
export class AddDeviceComponent implements OnInit {
  deviceForm: FormGroup;
  devices: any[] = [];
  filteredDevices: any[] = [];
  displayedColumns: string[] = ['brand', 'model', 'type', 'actions'];
  deviceTypes: string[] = ['Laptop', 'Telefon', 'Tablet', 'Egyéb'];

  filterType: string = "";
  filterBrand: string = "";
  brandList: string[] = [];

  constructor(
    private fb: FormBuilder,
    private deviceService: DeviceService
  ) {
    this.deviceForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.deviceService.getAllDevices().subscribe({
      next: (data) => {
        this.devices = data;
        this.brandList = [...new Set(data.map(d => d.brand))];
        this.applyFilter();
      },
      error: (err) => {
        console.error('Hiba az eszközök betöltésekor:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.deviceForm.invalid) {
      return;
    }

    const newDevice = {
      brand: this.deviceForm.value.brand,
      model: this.deviceForm.value.model,
      type: this.deviceForm.value.type
    };

    this.deviceService.addDevice(newDevice).then(() => {
      this.deviceForm.reset();
      this.loadData();
    });
  }
  
    applyFilter(): void {
    this.filteredDevices = this.devices.filter(device =>
      (this.filterType === '' || device.type === this.filterType) &&
      (this.filterBrand === '' || device.brand.toLowerCase().includes(this.filterBrand.toLowerCase()))
    );
  }

  editedDevice: any = null;

editDevice(device: any) {
  this.editedDevice = { ...device }; // másolat, hogy szerkeszthető legyen
}

saveEdit(device: any) {
  if (!this.editedDevice) return;
  this.deviceService.updateDevice(this.editedDevice.id, this.editedDevice).then(() => {
    this.editedDevice = null;
    this.loadData();
  });
}

confirmDelete(device: any) {
  if (confirm('Biztosan törlöd ezt az eszközt?')) {
    this.deviceService.deleteDevice(device.id).then(() => {
      this.loadData();
    });
  }
}
}