import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-newcar',
  templateUrl: './newcar.page.html',
  styleUrls: ['./newcar.page.scss'],
})
export class NewcarPage implements OnInit {
  file!: File;
  carForm!: FormGroup;

  constructor(
    private firestoreService: FirestoreService,
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
      imageUrl: ['', Validators.required],
    });
  }
  async addCar() {
    if (this.carForm.valid) {
      const newCar: Car = this.carForm.value;
      const filePath = this.createFilePath(newCar, this.file);
      newCar.imageURL = await this.firestoreService.uploadFile(this.file, filePath);
      await this.carService.addCar(newCar, this.file);

      // Limpiar el formulario después de agregar un nuevo coche
      this.carForm.reset();
    }
  }

  private createFilePath(newCar: Car, file: File) {
    return `car_images/${newCar.brand}_${newCar.model}_${newCar.year}.${this.getFileExtension(file)}`;
  }

  private getFileExtension(file?: File) {
    const fileName = file?.name;
    console.log('fileName=' + fileName);
    if (fileName) {
      const fileExtension = fileName.split('.').pop(); // Obtener la última parte después del último punto
      console.log('fileExtension=' + fileExtension);
      return fileExtension;
    } else {
      return '';
    }
  }

  onFileChosen(event: any) {
      this.file = event.target.files[0];

      if (this.file) {
        // Lee la imagen y la convierte a un formato base64
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.carForm.patchValue({
            imageUrl: e.target.result // Asigna el resultado a imageUrl en el formulario
          });
        };
        reader.readAsDataURL(this.file);
      }
  }

  goToCarList(){
    this.router.navigateByUrl('cars');
  }
  goToHome(){
    this.router.navigateByUrl('home');
  }

}
