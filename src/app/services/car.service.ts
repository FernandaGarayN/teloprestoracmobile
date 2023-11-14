import { Injectable, inject } from '@angular/core';
import { Car } from '../models/car';
import { Firestore, addDoc, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

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

  getCar(carId: string): Observable<Car> {
    const carRef=doc(this.firestore, `cars/${carId}`)
    return docData(carRef) as Observable<Car>;
  }
  async addCar(newCar: Car): Promise<void> {
    const collectionRef = collection(this.firestore, 'cars');
    await addDoc(collectionRef, newCar);
  }

  constructor() {
    const acollection = collection(this.firestore, 'cars');
    const cars$ = collectionData(acollection, {idField:'id'}) as Observable<Car[]>;

    cars$.pipe(shareReplay(1)).subscribe((carsFromFirestore) => {
      this.carsSubject.next(carsFromFirestore);
    });
  }
}

