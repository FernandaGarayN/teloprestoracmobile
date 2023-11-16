import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-newcar',
  templateUrl: './newcar.page.html',
  styleUrls: ['./newcar.page.scss'],
})
export class NewcarPage implements OnInit {
  carForm!: FormGroup;

  constructor(
    private carService: CarService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.initForm();
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
      image: [null, Validators.required],
    });
  }
  async addCar() {
    if (this.carForm.valid) {
      const newCar: Car = this.carForm.value;
      const imageFile = this.carForm.get('image')?.value;
      await this.carService.addCar(newCar, imageFile);

      // Limpiar el formulario después de agregar un nuevo coche
      this.carForm.reset();
    }
  }
  goToCarList(){
    this.router.navigateByUrl('cars');
  }
  goToHome(){
    this.router.navigateByUrl('home');
  }

}
