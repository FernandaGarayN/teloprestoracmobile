import { Injectable, inject } from '@angular/core';
import {
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  storage: FirebaseStorage;
  constructor() {
    this.storage = getStorage();
  }

  async uploadFile(aFile: File, filePath: string): Promise<string> {
    const fileReference = ref(this.storage, filePath);
    const snapshot = await uploadBytes(fileReference, aFile);
    return await getDownloadURL(snapshot.ref);
  }
}
