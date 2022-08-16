import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private router: Router
  ) { }
  
  public goto(url) {
    this.router.navigateByUrl(url, { replaceUrl: true });
  }
}
