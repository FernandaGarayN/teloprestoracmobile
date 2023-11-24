// edit-profile.page.ts
import { Component, NgZone, OnInit, inject } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  file!: File;
  user!: User;
  profileForm!: FormGroup;
  firestore: Firestore = inject(Firestore);

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.initializeForm();
        this.getUserAdditionalData(user.email);
      }
    });
  }

  initializeForm() {
    this.profileForm = this.formBuilder.group({
      username: ['', Validators.required],
      phonenumber: ['', Validators.required],
      imageUrl: [''],
    });
  }

  async getUserAdditionalData(email: string | null) {
    const usersCollection = collection(this.firestore, 'users');
    const q = query(usersCollection, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
      this.ngZone.run(() => {
        this.profileForm.setValue({
          username: doc.get('username'),
          phonenumber: doc.get('phonenumber'),
          imageUrl: ''
        });
      });
    });
  }

  onFileChosen(event: any) {
    this.file = event.target.files[0];

    if (this.file) {
      // Lee la imagen y la convierte a un formato base64
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileForm.patchValue({
          imageUrl: e.target.result, // Asigna el resultado a imageUrl en el formulario
        });
      };
      reader.readAsDataURL(this.file);
    }
  }

  saveChanges() {
    const editedUser: User = this.profileForm.value;

    // Llama a un servicio que actualiza la información del usuario
    // authService.updateUserProfile(updatedUserData).then(() => {
    //   Puedes manejar la redirección o mostrar un mensaje de éxito
    //   this.router.navigate(['profile']);
    // });
  }

  goToProfile() {
    this.router.navigateByUrl('profile');
  }
}
