import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
    RouterLink,
    HttpClientModule
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
  users: any[] = [];

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  loadUsers() {
    console.log("login filepath: ", window.location.pathname);
    console.log("login filepath: ", window.location.href);
    console.log("login filepath: ", window.location.origin);
    this.http.get('assets/dummy-data.json').subscribe({
      next: (data: any) => {
        this.users = data.users;
      },
      error: (err) => {
        console.error('Hiba a felhasználók betöltésekor:', err);
      }
    });
  }

  login() {
    this.loginError = '';

    const user = this.users.find(
      (u) => u.email === this.email.value && u.password === this.password.value
    );

    if (user) {
      this.isLoading = true;
      this.showLoginForm = false;

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loggedInUserId', user.id.toString());
      window.location.href = "/home";
    } else {
      this.loginError = 'Nem megfelelő email vagy jelszó';
    }
  }
}