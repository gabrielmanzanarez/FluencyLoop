import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonContent]
})
export class Tab1Page implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      const user = localStorage.getItem('user');
      if (user) {
        this.router.navigate(['/tabs/tab3']);
      } else {
        this.router.navigate(['/login']);
      }
    }, 4000);
  }
}