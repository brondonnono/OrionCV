import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

  // acces facile aux donnees du formulaire
  get email() {
    return this.credentials.get('email');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  resetPassword() { }
}
