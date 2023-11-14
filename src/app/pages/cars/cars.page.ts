import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.page.html',
  styleUrls: ['./cars.page.scss'],
})
export class CarsPage implements OnInit {

  cars$!: Observable<Car[]>;
  enableDelete: boolean = false;
  carsToDelete: string [] = [];


  constructor(
    private carService: CarService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.cars$ = this.carService.getAllCars();
  }

  goToHome() {
    this.router.navigateByUrl('home');
  }
  goToNew() {
    this.router.navigateByUrl('cars/new');
  }
  enableDeleteFn(){
    this.enableDelete = true;
  }
  deleteCars() {
    this.carsToDelete.forEach(carId => this.carService.deleteCar(carId))
    this.carsToDelete = [];
    this.enableDelete = false;
  }
  toggleDelete(car: Car) {
    // Verificar si el coche ya está en la lista para eliminar
    if (this.carsToDelete.includes(car.id)) {
      this.carsToDelete = this.carsToDelete.filter(c => c !== car.id);
    } else {
      this.carsToDelete.push(car.id);
    }
  }

}
