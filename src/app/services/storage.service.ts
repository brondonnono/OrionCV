import { Auth } from '@angular/fire/auth';
import { doc, docData, setDoc, serverTimestamp, Firestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private auth: Auth,
    private firestore: Firestore,
  ) { }

  async storeUserEmail(email) {
    console.log(email, '  email');
    try {
      const user = this.auth.currentUser;
      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userDocRef, {
        email,
        lastUpdate: serverTimestamp()
      });
      return true;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
