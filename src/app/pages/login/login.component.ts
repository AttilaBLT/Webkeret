import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service'; // ÚJ!
import { User } from '../../interfaces/user.interface'; // ÚJ!
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  email = new FormControl('');
  password = new FormControl('');
  isLoading: boolean = false;
  loginError: string = '';
  showLoginForm: boolean = true;

  constructor(private userService: UserService, private router: Router) {}

  login() {
    this.loginError = '';
    this.isLoading = true;

    this.userService.getUserByEmailAndPassword(this.email.value!, this.password.value!).subscribe({
      next: (users: User[]) => {
        this.isLoading = false;
        if (users.length > 0) {
          const user = users[0];
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userRole', user.role);
          if (user.id) {
            localStorage.setItem('loggedInUserId', user.id.toString());
          }
          window.location.href = "/home";
        } else {
          this.loginError = 'Nem megfelelő email vagy jelszó';
          this.showLoginForm = true;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.loginError = 'Hiba a bejelentkezés során!';
        this.showLoginForm = true;
        console.error(err);
      }
    });
  }
}