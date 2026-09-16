import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonItem, IonInput, IonButton, IonIcon, IonText } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline, personOutline, languageOutline } from 'ionicons/icons';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonContent, IonItem, IonInput, IonButton, IonIcon, IonText, CommonModule, FormsModule]
})
export class SignupPage implements OnInit {
  name = '';
  email = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router, private authService: AuthService) {
    addIcons({ mailOutline, lockClosedOutline, personOutline, languageOutline });
  }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/tabs/home']);
    }
  }

  onSignup() {
    this.errorMessage = '';
    if (!this.name || !this.email || !this.password) {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }

    this.authService.signup({ name: this.name, email: this.email, password: this.password }).subscribe({
      next: (res) => {
        console.log('Registro exitoso', res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error de registro', err);
        this.errorMessage = err.error?.error || 'Error al registrar usuario';
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
