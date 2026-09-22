import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonButtons, IonIcon, IonAvatar, IonItem, IonLabel } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { logOutOutline, personCircleOutline } from 'ionicons/icons';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonButtons, IonIcon, IonAvatar, IonItem, IonLabel, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {
  user: any = null;
  private cdr = inject(ChangeDetectorRef);

  constructor(private navCtrl: NavController) {
    addIcons({ logOutOutline, personCircleOutline });
  }

  async ngOnInit() {
    const { value } = await Preferences.get({ key: 'user' });
    if (value && value !== 'undefined') {
      try {
        this.user = JSON.parse(value);
      } catch (e) {
        console.error('Error parsing user from Preferences', e);
      }
    } else {
      this.navCtrl.navigateRoot('/login');
    }
    this.cdr.detectChanges();
  }

  async logout() {
    await Preferences.remove({ key: 'user' });
    this.navCtrl.navigateRoot('/login');
  }
}
