import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { userRole, User } from '../../interfaces/user.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class RegistrationComponent {
  isLoading: boolean = false;
  showRegistrationForm: boolean = true;
  registrationForm: FormGroup;
  roles: userRole[] = ['admin', 'user'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      role: ['user', Validators.required],
      password: ['', Validators.required]
    });
  }

  async register() {
    if (this.registrationForm.valid) {
      this.isLoading = true;
      this.showRegistrationForm = false;
      const email = this.registrationForm.value.email;

      const exists = await this.userService.emailExists(email);
      if (exists) {
        this.isLoading = false;
        this.showRegistrationForm = true;
        alert('Ez az email cím már foglalt!');
        return;
      }

      const userData: User = {
        name: this.registrationForm.value.name,
        email: email,
        password: this.registrationForm.value.password,
        phone: this.registrationForm.value.phone,
        role: this.registrationForm.value.role,
        appointment: []
      };

      this.userService.addUser(userData).then(() => {
        this.isLoading = false;
        this.router.navigate(['/login']);
      }).catch(err => {
        this.isLoading = false;
        this.showRegistrationForm = true;
        alert('Hiba a regisztráció során!');
        console.error(err);
      });
    }
  }
}