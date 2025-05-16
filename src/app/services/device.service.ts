import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DeviceService {
  constructor(private firestore: Firestore) {}

  getAllDevices(): Observable<any[]> {
    const ref = collection(this.firestore, 'devices');
    return collectionData(ref, { idField: 'id' }) as Observable<any[]>;
  }

  addDevice(device: any) {
    const ref = collection(this.firestore, 'devices');
    return addDoc(ref, device);
  }

  updateDevice(id: string, device: any) {
  const deviceRef = doc(this.firestore, 'devices', id);
  return updateDoc(deviceRef, device);
}

deleteDevice(id: string) {
  const deviceRef = doc(this.firestore, 'devices', id);
  return deleteDoc(deviceRef);
}
}