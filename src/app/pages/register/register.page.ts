import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage {
  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirm: ['', [Validators.required]]
  });

  private returnUrl = '/dashboard';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private route: ActivatedRoute, private notify: NotificationService) {
    const q = this.route.snapshot.queryParamMap.get('redirect');
    if (q) this.returnUrl = q;
  }

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.value;
    if (v.password !== v.confirm) {
      this.form.get('confirm')?.setErrors({ mismatch: true });
      return;
    }
    
    try {
      const res = await this.auth.register(v.username as string, v.email as string, v.password as string);
      if (res.success) {
        this.notify.show('Registro completado exitosamente');
        this.router.navigateByUrl(this.returnUrl);
      } else {
        this.notify.show(res.message || 'Error en el registro');
      }
    } catch (error: any) {
      this.notify.show(error.message || 'Error al registrar usuario');
    }
  }
}
