import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage {
  user: any = { name: 'Demo User', email: 'demo@user.com' };
  constructor(private auth: AuthService, private router: Router) {
    const u = this.auth.getUser();
    if (u) {
      this.user = { name: u.email.split('@')[0], email: u.email };
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
