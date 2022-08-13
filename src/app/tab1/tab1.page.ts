import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AvatarService } from '../services/avatar.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  profile = null;
  // placeholder_avatar = 'assets/images/avatars/default.png';

  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.avatarService.getUserProfile().subscribe(data => {
      this.profile = data;
    });
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  goto(url) {
    this.router.navigateByUrl(url, { replaceUrl: true });
  }

  showNotifications() { }

  quickSearch(event: any) {
    const val = event.target.value;
    if (val && val.trim() != '') { }
  }

}
