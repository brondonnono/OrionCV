import { StorageService } from './../../services/storage.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
  isVisible: boolean = false;
  errorMessages = { email: '', password: '' };
  isLoading: boolean = false;
  isErrors: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private storageService: StorageService,
    public navigationService: NavigationService,
  ) { }

  // acces facile aux donnees du formulaire
  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.register(this.credentials.value);
    await loading.dismiss();

    if (user) {
      const result = await this.storageService.storeUserEmail(this.email.value);
      if (result)
        this.navigationService.goto('');
      else {
        this.authService.deleteUser();
        this.showAlert('Echec d\'inscription', 'Veuillez reéssayer SVP!');
      }
    } else {
      this.showAlert('Echec d\'inscription', 'Veuillez reéssayer SVP!');
    }
  }

  isCredentials(): boolean {
    return ((this.credentials.get('email').value).trim() == '' || (this.credentials.get('password').value).trim() == '') ? false : true;
  }

  async login() {
    if (this.isCredentials()) {
      if (this.credentials.valid) {
        const loading = await this.loadingController.create();
        await loading.present();
  
        const user = await this.authService.login(this.credentials.value);
        await loading.dismiss();
  
        if (user) {
          this.navigationService.goto('');
        } else {
          this.showAlert('Echec de connexion', 'Veuillez reéssayer SVP!');
        }
      }
    } else {
      this.showAlert('Informations requises', 'Tous les champs sont obligatoires');
    }
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    alert.present();
  }

  public getPasswordType() {
    return this.isVisible ? 'text' : 'password';
  }

  async changePasswordVisibility() {
    this.isVisible = !this.isVisible;
  }

}
