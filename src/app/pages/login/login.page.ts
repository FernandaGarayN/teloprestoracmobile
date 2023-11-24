import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials!: FormGroup;
  firestore: Firestore = inject(Firestore);
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) {}

  get email() {
    return this.credentials.get('email');
  }
  get password() {
    return this.credentials.get('password');
  }

  async registrar() {
    console.log('intentando registar');
    const user = await this.authService.register(this.credentials.value);
    if (user) {
      const userprofile = {
        email: this.credentials.get('email')?.value,
      };
      const collectionRef = collection(this.firestore, 'users');
      await addDoc(collectionRef, userprofile);
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      console.log('error al registrar');
      await this.toastErrorMessage('El correo que intenta registrar ya existe');
    }
  }
  ngOnInit() {
    this.credentials = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async ingresar() {
    console.log('intentando ingresar');
    const user = await this.authService.login(this.credentials.value);
    if (user) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      console.log('error al ingresar');
      await this.toastErrorMessage('Correo y/o contraseña inválidos');
    }
  }

  async toastErrorMessage(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'middle',
      color: 'danger',
    });
    toast.present();
  }
}
