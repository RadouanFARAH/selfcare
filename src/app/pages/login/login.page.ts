import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RegisterPage } from '../register/register.page';
import { NavController } from '@ionic/angular';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  passwordType : String = "password";
  passwordIcon : String = "eye-off";
  registerPage : RegisterPage;
  credentialsForm: FormGroup;
 
  constructor(private formBuilder: FormBuilder, private authService: AuthService, public navCtrl: NavController) { }
 
  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  hideShowPassword(){
    this.passwordType = this.passwordType === "text" ? "password" : "text";
    this.passwordIcon = this.passwordIcon === "eye" ? "eye-off" : "eye";
  }
 
  onSubmit() {
   this.authService.login(this.credentialsForm.value).subscribe();
  }
 

  goToRegisterPage(){
    this.navCtrl.navigateRoot('register')
  }
 
}
