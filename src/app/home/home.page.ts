import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
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
import { Preferences } from '@capacitor/preferences';

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
  
  private cdr = inject(ChangeDetectorRef);

  constructor() {
    addIcons({ logOutOutline });
  }

  ngOnInit() {
    this.loadUser();
    this.loadLanguages();
  }

  async loadUser() {
    const { value } = await Preferences.get({ key: 'user' });
    if (value && value !== 'undefined') {
      try {
        const user: User = JSON.parse(value);
        this.userName = user.name || 'Student';
      } catch (e) {
        console.error('Error parsing user from Preferences', e);
        this.userName = 'Student';
      }
    } else {
      this.userName = 'Student';
    }
    this.cdr.detectChanges();
  }

  loadLanguages() {
    console.log('Fetching languages...');
    this.languageService.getLanguages().subscribe({
      next: (data) => {
        console.log('Languages loaded:', data);
        this.languages = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching languages:', err);
      }
    });
  }

  async logout() {
    await Preferences.remove({ key: 'user' });
    this.router.navigate(['/login']);
  }

  goToLessons(langId?: number) {
    console.log('Navigating to lessons for language', langId);
    this.router.navigate(['/lessons']);
  }
}
