import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonGrid, IonRow, IonCol, IonCard, IonCardHeader,
  IonCardTitle, IonText, IonButtons, IonButton, IonIcon
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';
import { LanguageService } from '../services/language.service';
import { Language, User } from '../models/models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonHeader, IonToolbar, IonTitle, IonContent,
    IonGrid, IonRow, IonCol, IonCard, IonCardHeader,
    IonCardTitle, IonText, IonButtons, IonButton, IonIcon
  ],
})
export class HomePage implements OnInit {
  private languageService = inject(LanguageService);
  private router = inject(Router);
  
  public userName: string = '';
  public languages: Language[] = [];

  constructor() {
    addIcons({ logOutOutline });
  }

  ngOnInit() {
    this.loadUser();
    this.loadLanguages();
  }

  loadUser() {
    const userStr = localStorage.getItem('user');
    if (userStr && userStr !== 'undefined') {
      try {
        const user: User = JSON.parse(userStr);
        this.userName = user.name || 'Student';
      } catch (e) {
        console.error('Error parsing user from localStorage', e);
        this.userName = 'Student';
      }
    } else {
      this.userName = 'Student';
    }
  }

  loadLanguages() {
    console.log('Fetching languages...');
    this.languageService.getLanguages().subscribe({
      next: (data) => {
        console.log('Languages loaded:', data);
        this.languages = data;
      },
      error: (err) => {
        console.error('Error fetching languages:', err);
      }
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  goToLessons(langId?: number) {
    console.log('Navigating to lessons for language', langId);
    this.router.navigate(['/lessons']);
  }
}
