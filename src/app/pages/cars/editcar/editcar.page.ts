import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-editcar',
  templateUrl: './editcar.page.html',
  styleUrls: ['./editcar.page.scss'],
})
export class EditcarPage implements OnInit {
  carForm!: FormGroup;
  carId!: string;

  constructor(
    private carService: CarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const carId = paramMap.get('carId');
      if (carId !== null) {
        this.carId = carId;
      }
    });
    this.initForm();
    this.loadCarData();
  }
  initForm() {
    this.carForm = this.formBuilder.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      price: ['', Validators.required],
      color: ['', Validators.required],
      plateCode: ['', Validators.required],
      available: [true, Validators.required],
    });
  }

  loadCarData() {
    this.carService.getCar(this.carId).subscribe((car: Car) => {
      this.carForm.setValue({
        brand: car.brand,
        model: car.model,
        year: car.year,
        price: car.price,
        color: car.color,
        plateCode: car.plateCode,
        available: car.available,
      });
    });
  }

  goToCarList() {
    this.router.navigateByUrl('cars');
  }
  editCar() {
    const editedCar: Car = this.carForm.value;
    this.carService.updateCar(this.carId, editedCar).then(() => {
      this.goToCarList();
    });
  }
}
