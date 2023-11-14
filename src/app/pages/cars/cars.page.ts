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

}
