import { Injectable, inject } from '@angular/core';
import { Car } from '../models/car';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  firestore: Firestore = inject(Firestore);
  cars$: Observable<Car[]>;
  public cars: Car[] = [
    {
      id: 1,
      brand: 'Chery',
      model: 'Tiggo3',
      year: 2022,
      price: 80000,
      color: 'grey',
      plateCode: 'RTXT65',
      avalaible: true,
    },
    {
      id: 2,
      brand: 'Hyundai',
      model: 'Elantra',
      year: 2012,
      price: 60000,
      color: 'blue',
      plateCode: 'DXLZ36',
      avalaible: true,
    },
  ];

  getAllCars(){
    return this.cars$;
  }

  getCar(carId: number): Car | undefined {
    return this.cars.find(car => car.id   === carId);
  }

  constructor() {
    const acollection = collection(this.firestore, 'cars');
    this.cars$ = collectionData(acollection) as Observable<Car[]>;
  }
}
