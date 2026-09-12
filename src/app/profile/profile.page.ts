import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonButtons, IonIcon, IonAvatar, IonItem, IonLabel } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { logOutOutline, personCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonButtons, IonIcon, IonAvatar, IonItem, IonLabel, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {
  user: any = null;

  constructor(private navCtrl: NavController) {
    addIcons({ logOutOutline, personCircleOutline });
  }

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    } else {
      this.navCtrl.navigateRoot('/login');
    }
  }

  logout() {
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
}
