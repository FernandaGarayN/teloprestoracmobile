import { Injectable, inject } from '@angular/core';
import { Car } from '../models/car';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
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

  getCar(carId: number): Car | undefined {
    return this.carsSubject.value.find((car) => car.id === carId);
  }

  constructor() {
    const acollection = collection(this.firestore, 'cars');
    const cars$ = collectionData(acollection) as Observable<Car[]>;

    cars$.pipe(shareReplay(1)).subscribe((carsFromFirestore) => {
      this.carsSubject.next(carsFromFirestore);
    });
  }
}

