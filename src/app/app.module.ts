import { ModalComponent } from './components/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { SpeechRecognition } from '@awesome-cordova-plugins/speech-recognition/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment.prod';
import { ForgotComponent } from './components/forgot/forgot.component';

@NgModule({
  declarations: [
    AppComponent,
    ForgotComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [
    { 
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy 
    },
    SpeechRecognition,
    NavParams
  ],
  bootstrap: [AppComponent],
  exports: [
    ForgotComponent,
    ModalComponent,
  ],
})
export class AppModule { }
