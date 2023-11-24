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
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  file!: File;
  userId!: string;
  email!: string;
  profileForm!: FormGroup;
  firestore: Firestore = inject(Firestore);

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private userService: UserService,
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
        this.userId = doc.id;
        this.email = doc.get('email');
        this.profileForm.setValue({
          username: doc.get('username'),
          phonenumber: doc.get('phonenumber'),
          imageUrl: doc.get('imageUrl') || ''
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

 async saveChanges() {
    if (this.profileForm.valid) {
      const editedUser: User = this.profileForm.value;
      editedUser.email = this.email;
      if (this.file) {
        const filePath = this.createFilePath(editedUser, this.file);
        editedUser.imageUrl = await this.firestoreService.uploadFile(this.file, filePath);
      }
      await this.userService.edit(this.userId, editedUser);
      this.authService.notifyUserChanges();
      this.goToProfile();
    }
  }

  private createFilePath(aUser: User, file: File) {
    return `user_images/${aUser.username}_profile.${this.getFileExtension(file)}`;
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

  goToProfile() {
    this.router.navigateByUrl('profile');
  }
}
