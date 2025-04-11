import { Injectable } from '@angular/core';
import { Device } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private devices: Device[] = [
    { id: 1, type: 'Phone', brand: 'iPhone', model: 'iPhone 13', userId: 1 },
    { id: 2, type: 'Phone', brand: 'iPhone', model: 'iPhone 12', userId: 1 },
    { id: 3, type: 'Phone', brand: 'Samsung', model: 'Galaxy S21', userId: 1 },
    { id: 4, type: 'Phone', brand: 'Samsung', model: 'Galaxy Note 20', userId: 1 },
  ];

  getAllDevices(): Device[] {
    return this.devices;
  }
}
