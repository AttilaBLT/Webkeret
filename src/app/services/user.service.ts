import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, query, where, addDoc, getDocs, getDoc, doc } from '@angular/fire/firestore';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private firestore: Firestore) {}

  getUserByEmailAndPassword(email: string, password: string): Observable<User[]> {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('email', '==', email), where('password', '==', password));
    return collectionData(q, { idField: 'id' }) as Observable<User[]>;
  }

  getUserById(id: string) {
    const userDoc = doc(this.firestore, 'users', id);
    return getDoc(userDoc);
  }

  addUser(user: User) {
    const usersRef = collection(this.firestore, 'users');
    return addDoc(usersRef, user);
  }

  async emailExists(email: string): Promise<boolean> {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }
}