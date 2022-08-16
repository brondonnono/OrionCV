import { UtilService } from '../../../services/util.service';
import { StorageService } from '../../../services/storage.service';
import { AuthService } from '../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private authService: AuthService,
    private storageService: StorageService,
    private utilService: UtilService,
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
    await this.utilService.showLoader();

    const user = await this.authService.register(this.credentials.value);
    await this.utilService.dismiss();

    if (user) {
      const result = await this.storageService.storeUserEmail(this.email.value);
      if (result)
        this.navigationService.goto('');
      else {
        this.authService.deleteUser();
        this.utilService.showAlert('Echec d\'inscription', 'Veuillez reéssayer SVP!');
      }
    } else {
      this.utilService.showAlert('Echec d\'inscription', 'Veuillez reéssayer SVP!');
    }
  }

  isCredentials(): boolean {
    return ((this.credentials.get('email').value).trim() == '' || (this.credentials.get('password').value).trim() == '') ? false : true;
  }

  async login() {
    if (this.isCredentials()) {
      if (this.credentials.valid) {
        await this.utilService.showLoader();
  
        const user = await this.authService.login(this.credentials.value);
        await this.utilService.dismiss();
  
        if (user) {
          this.navigationService.goto('');
        } else {
          this.utilService.showAlert('Echec de connexion', 'Veuillez reéssayer SVP!');
        }
      }
    } else {
      this.utilService.showAlert('Informations requises', 'Tous les champs sont obligatoires');
    }
  }

  public getPasswordType() {
    return this.isVisible ? 'text' : 'password';
  }

  async changePasswordVisibility() {
    this.isVisible = !this.isVisible;
  }

}
