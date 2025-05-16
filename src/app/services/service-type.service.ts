import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceTypeService {
  constructor(private firestore: Firestore) {}

  getAllServiceTypes(): Observable<any[]> {
    const ref = collection(this.firestore, 'serviceTypes');
    return collectionData(ref, { idField: 'id' }) as Observable<any[]>;
  }

  addServiceType(serviceType: any) {
    const ref = collection(this.firestore, 'serviceTypes');
    return addDoc(ref, serviceType);
  }

    updateServiceType(id: string, serviceType: any) {
    const serviceTypeRef = doc(this.firestore, 'serviceTypes', id);
    return updateDoc(serviceTypeRef, serviceType);
  }

  deleteServiceType(id: string) {
    const serviceTypeRef = doc(this.firestore, 'serviceTypes', id);
    return deleteDoc(serviceTypeRef);
  }
}