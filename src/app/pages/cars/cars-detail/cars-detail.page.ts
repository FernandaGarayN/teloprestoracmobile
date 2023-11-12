import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cars-detail',
  templateUrl: './cars-detail.page.html',
  styleUrls: ['./cars-detail.page.scss'],
})
export class CarsDetailPage implements OnInit {
  car!: Car | undefined;
  constructor(private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const carId = paramMap.get('carId');
      if (carId !== null) {
        this.car = this.carService.getCar(parseInt(carId, 10));
        console.log(this.car);
      }
    });
  }

  goToCars(){
    this.router.navigateByUrl('cars')
  }

}
