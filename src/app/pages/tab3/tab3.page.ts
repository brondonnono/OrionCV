import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { AvatarService } from '../../services/avatar.service';
import { Camera, CameraResultType, CameraSource } from "@Capacitor/camera";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  profile = null;
  // placeholder_avatar = 'assets/images/avatars/default.png';

  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.avatarService.getUserProfile().subscribe(data => {
      this.profile = data;
    });
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });
    console.log(image);

    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.avatarService.uploadImage(this.profile, image);
      loading.dismiss();

      if(!result) {
        const alert = await this.alertController.create({
          header: 'Echec de l\'upload',
          message: 'Une erreur est survenue lors l\'upload de votre image',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }

  }

}