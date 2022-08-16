import { NavigationService } from 'src/app/services/navigation.service';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AvatarService } from '../../services/avatar.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  profile = null;
  // placeholder_avatar = 'assets/images/avatars/default.png';
  menus = [];

  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private storageService: StorageService,
    public navigationService: NavigationService,
    private router: Router,
  ) {
    this.avatarService.getUserProfile().subscribe(data => {
      this.profile = data;
    });
    this.getMenus();
  }

  async getMenus() {
    const result = await this.storageService.getMenuItems();
    if (result) {
      result.forEach((res) => {
        this.menus.push(res.data());
      });
    }
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  showDetails(itemName) {
    this.router.navigateByUrl(`/details?itemName=${itemName}`);
  }

  showNotifications() { }

  quickSearch(event: any) {
    const val = event.target.value;
    if (val && val.trim() != '') { }
  }

}
