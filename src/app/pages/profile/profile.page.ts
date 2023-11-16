import { Component, OnInit, inject } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user!: User;
  firestore: Firestore = inject(Firestore);

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.getUserAdditionalData(user.email);
      }
    });
  }
  async getUserAdditionalData(email: string | null) {
    const usersCollection = collection(this.firestore, 'users');
    const q = query(usersCollection, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
      this.user = new User();
      this.user.email = doc.get('email');
      this.user.phonenumber = doc.get('phonenumber');
      this.user.id = doc.id;
      this.user.username = doc.get('username');
    });
  }
  goToHome(){
    this.router.navigateByUrl('home')
  }
}
