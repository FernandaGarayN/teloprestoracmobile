import { Injectable, inject } from '@angular/core';
import { User } from '../models/user';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  firestore: Firestore = inject(Firestore);

  constructor() {}
  
  async edit(id: string, editedUser: User) {
    const userRef = doc(this.firestore, 'users', id);
    await setDoc(userRef, editedUser);
  }
}
