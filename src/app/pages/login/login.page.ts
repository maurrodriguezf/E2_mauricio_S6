import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [style({ opacity: 0, transform: 'translateY(8px)' }), animate('300ms ease-out', style({ opacity: 1, transform: 'none' }))])
    ])
  ]
})
export class LoginPage {
  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  private returnUrl = '/dashboard';

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private auth: AuthService, private notify: NotificationService) {
    const q = this.route.snapshot.queryParamMap.get('redirect');
    if (q) this.returnUrl = q;
  }

  async submit() {
    if (this.form.valid) {
      const username = (this.form.value.username ?? '') as string;
      const password = (this.form.value.password ?? '') as string;
      
      try {
        const ok = await this.auth.login(username, password);
        if (ok) {
          this.notify.show('Inicio de sesión exitoso');
          this.router.navigateByUrl(this.returnUrl);
        } else {
          this.notify.show('Credenciales inválidas');
        }
      } catch (error: any) {
        this.notify.show(error.message || 'Error al iniciar sesión');
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
}
