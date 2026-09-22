import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent, IonSpinner, IonText } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-splash',
  templateUrl: 'splash.page.html',
  styleUrls: ['splash.page.scss'],
  standalone: true,
  imports: [IonContent]
})
export class SplashPage {
  constructor(private router: Router) {}

  ionViewDidEnter() {
    setTimeout(async () => {
      const { value } = await Preferences.get({ key: 'user' });
      if (value) {
        this.router.navigate(['/tabs/home']);
      } else {
        this.router.navigate(['/login']);
      }
    }, 1500);
  }
}