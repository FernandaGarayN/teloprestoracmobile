import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials !: FormGroup;
  errorMessage !: string;
  constructor(
    private authService : AuthService,
    private router : Router,
    private formBuilder : FormBuilder
  ) { }

    get email () {return this.credentials.get('email');}
    get password () {return this.credentials.get('password');}

    async registrar () {
      console.log("intentando registar");
      const user = await this.authService.register(this.credentials.value);
      if (user){
        this.router.navigateByUrl('/home',{replaceUrl:true});
      }else{
        console.log("error al registrar");
      }
    }
  ngOnInit() {
    this.credentials = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]
    })
  }

  async ingresar () {
    console.log("intentando ingresar");
    const user = await this.authService.login(this.credentials.value);
    if (user){
      this.router.navigateByUrl('/home',{replaceUrl:true});
    }else{
      console.log("error al ingresar");
      this.errorMessage ="Correo y o contraseña invalido";
    }
  }

}
