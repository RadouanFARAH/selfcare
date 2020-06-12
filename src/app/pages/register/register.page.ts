import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  public selectedValue: any ="";
  slideOneForm : FormGroup;
  slideTwoForm : FormGroup;
  slideThreeForm : FormGroup;
  password :string = this.generatePassword();

  constructor(private navCtrl : NavController, private formBuilder: FormBuilder, private authService : AuthService, private alertController : AlertController ) { }

  ngOnInit() {
    this.slideOneForm = this.formBuilder.group({
      sexe: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      dateDeNaissance: ['', [Validators.required]],
      situationFamilialle: ['', [Validators.required]]
    });
    this.slideTwoForm = this.formBuilder.group({
      cin: ['', [Validators.required]],
      dateExperationCIN: ['', [Validators.required]],
      telephoneMobile: ['', [Validators.required]],
      telephoneSupp: ['', [Validators.required]],
      telephoneDomicile: ['', [Validators.required]]
    });
    this.slideThreeForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      ville: ['', [Validators.required]],
      codePostale: ['', [Validators.required]],
      adresse: ['', [Validators.required]]
    });
  }

  onSubmit(){
    let newUserInfos = {...this.slideOneForm.value, ...this.slideTwoForm.value, ...this.slideThreeForm.value, password : this.password}
    console.log(newUserInfos)
    this.authService.register(newUserInfos).subscribe(res => {
      this.showAlert(res);
      
    })
    
  }
  generatePassword() {
    var length = 6,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
   
  showAlert(msg) {
    let alert = this.alertController.create({
      message: 'Thanks '+ msg.nom +' '+ msg.prenom +' Your demande is registred wait for our call. '+ ' To login use this password :  ' + this.password,
      header: 'Success',
      buttons: ['OK']
    });
    alert.then(alert => {alert.present(); this.navCtrl.navigateRoot('login')});
  }
  goToLoginPage(){
    this.navCtrl.navigateRoot('login')
  }

}
