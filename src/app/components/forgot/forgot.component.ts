import { UtilService } from './../../services/util.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {

  credentials: FormGroup;
  isVisible: boolean = false;
  errorMessages = { email: '' };
  isLoading: boolean = false;
  isErrors: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private utilService: UtilService,
    private navigationService: NavigationService,
  ) { }

  // acces facile aux donnees du formulaire
  get email() {
    return this.credentials.get('email');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async resetPassword() {
    if (this.authService.isconnected()) {
      this.navigationService.goto('/home');
    } else {
      this.utilService.showLoader();
      this.authService.resetPasswordEmail(this.email.value).then((res) => {
        this.utilService.dismiss();
        this.utilService.showAlert('Informations','Si cette addresse mail est liée à un compte, vous recevrez un email de reinitialisation de mot de passe. Vérifiez votre boîte mail');
      })
        .catch((error) => {
          this.utilService.dismiss();
          const errorCode = error.code;
          const errorMessage = error.message;
          const errorsTabCode = ['auth/user-not-found'];
          let code  = '';
          for (let i = 0; i < errorsTabCode.length; i++) {
            code = errorsTabCode[i];
            if (code == errorCode) {
              i = errorsTabCode.length;
            }
          }
          if (code == errorCode)
            this.utilService.showAlert('Informations','Si cette addresse mail est liée à un compte, vous recevrez un email de reinitialisation de mot de passe. Vérifiez votre boîte mail et vos spams');
          else
            this.utilService.showAlert('Informations', 'Une erreur est survenue avec le code: ' + errorCode + ' et le message: ' + errorMessage);
        })
        .finally(() => {
          this.utilService.dismiss();
        });
    }
  }
}
