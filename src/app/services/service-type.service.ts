import { Injectable } from '@angular/core';
import { ServiceType } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ServiceTypeService {

  private serviceTypes: ServiceType[] = [
    { id: 1, name: 'Screen Replacement', price: 50000, duration: 120 },
    { id: 2, name: 'Battery Replacement', price: 15000, duration: 60 }
  ];

  getAllServiceTypes(): ServiceType[] {
    return this.serviceTypes;
  }
}
