import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class Login {

  username: string = '';
  password: string = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(): void {

    const loginData = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>(
      'https://localhost:7134/api/Auth/Login',
      loginData
    ).subscribe({
      next: (res) => {

        console.log(res);

        localStorage.setItem(
          'accessToken',
          res.AccessToken
        );

        localStorage.setItem(
          'refreshToken',
          res.RefreshToken
        );

        alert('Login successful');

       this.router.navigate(['/dashboard']);
      },

      error: (err) => {

        console.error(err);

        alert('Invalid username or password');
      }
    });
  }
}