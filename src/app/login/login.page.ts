import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonItem, IonInput, IonButton, IonIcon, IonText } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline, languageOutline } from 'ionicons/icons';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonItem, IonInput, IonButton, IonIcon, IonText, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router, private authService: AuthService) { 
    addIcons({ mailOutline, lockClosedOutline, languageOutline });
  }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/tabs/tab3']);
    }
  }

  onLogin() {
    this.errorMessage = '';
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, introduce correo y contraseña';
      return;
    }

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        console.log('Inicio de sesión exitoso:', res);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/tabs/tab3']);
      },
      error: (err) => {
        console.error('Error de inicio de sesión:', err);
        this.errorMessage = err.error?.error || 'Error al iniciar sesión';
      }
    });
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
