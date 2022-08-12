import { ref, uploadString, getDownloadURL, Storage } from '@angular/fire/storage';
import { doc, docData, setDoc, serverTimestamp, Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
  ) { }

  getUserProfile() {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    return docData(userDocRef);
  }

  async uploadImage(profile, cameraFile: Photo) {
    const user = this.auth.currentUser;
    const path = `uploads/${user.uid}/profile.png`;
    const storageRef = ref(this.storage, path);
    console.log('storageRef ', storageRef);

    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64');

      const imageUrl = await getDownloadURL(storageRef);
      console.log('imageUrl ', imageUrl);

      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      profile.imageUrl = imageUrl;
      profile.lastUpdate = serverTimestamp();
      await setDoc(userDocRef, profile);
      return true;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
