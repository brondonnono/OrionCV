import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
} from '@angular/fire/auth-guard';
import { ForgotComponent } from './components/forgot/forgot.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./authentification/login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'speech',
    loadChildren: () => import('./speech/speech.module').then( m => m.SpeechPageModule)
  },
  {
    path: 'forgot',
    component: ForgotComponent
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
