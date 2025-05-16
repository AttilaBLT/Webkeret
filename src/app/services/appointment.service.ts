import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  constructor(private firestore: Firestore) {}

  getAllAppointments(): Observable<any[]> {
    const ref = collection(this.firestore, 'appointments');
    return collectionData(ref, { idField: 'id' }) as Observable<any[]>;
  }

  addAppointment(appointment: any) {
    const ref = collection(this.firestore, 'appointments');
    return addDoc(ref, appointment);
  }
  updateAppointment(id: string, appointment: any) {
  const appointmentRef = doc(this.firestore, 'appointments', id);
  return updateDoc(appointmentRef, appointment);
}

deleteAppointment(id: string) {
  const appointmentRef = doc(this.firestore, 'appointments', id);
  return deleteDoc(appointmentRef);
}
}