import { Injectable, inject } from '@angular/core';
import { Car } from '../models/car';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, setDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  firestore: Firestore = inject(Firestore);
  private carsSubject = new BehaviorSubject<Car[]>([]);
  cars$: Observable<Car[]> = this.carsSubject.asObservable();

  getAllCars() {
    return this.cars$;
  }
  private getFileExtension(file?:File){
    const fileName = file?.name;
if (fileName) {
  const fileExtension = fileName.split('.').pop(); // Obtener la última parte después del último punto
  return fileExtension;
} else {
  return "";
}

  }

  getCar(carId: string): Observable<Car> {
    const carRef=doc(this.firestore, `cars/${carId}`)
    return docData(carRef) as Observable<Car>;
  }
  async addCar(newCar: Car, imageFile?: File): Promise<void> {
    if (imageFile) {
      const filePath = `car_images/${newCar.brand}_${newCar.model}_${newCar.year}`;
      const storage = getStorage();
      const carImageRef = ref(storage, filePath+this.getFileExtension(imageFile));
      uploadBytes(carImageRef, imageFile).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        getDownloadURL(snapshot.ref).then(downloadURL=>newCar.imageURL=downloadURL);
      });
    }
    const collectionRef = collection(this.firestore, 'cars');
    await addDoc(collectionRef, newCar);
  }
  async updateCar(carId: string, updatedCar: Car): Promise<void> {
    const carRef = doc(this.firestore, 'cars', carId);
    await setDoc(carRef, updatedCar);
  }
  async deleteCar(carId: string): Promise<void> {
    const carRef = doc(this.firestore, 'cars', carId);
    await deleteDoc(carRef);
  }

  constructor() {
    const acollection = collection(this.firestore, 'cars');
    const cars$ = collectionData(acollection, {idField:'id'}) as Observable<Car[]>;

    cars$.pipe(shareReplay(1)).subscribe((carsFromFirestore) => {
      this.carsSubject.next(carsFromFirestore);
    });
  }
}

