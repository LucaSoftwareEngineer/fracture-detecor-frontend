import { AuthService } from './../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import SecureLS from 'secure-ls';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  cookie = new SecureLS();

  ricordaCredenziali: boolean = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.cookie.get('username'));

    if (this.cookie.get('username') != null) {
      this.username = this.cookie.get('username');
    }

    if (this.cookie.get('password') != null) {
      this.password = this.cookie.get('password');
    }
  }

  setCookie() {
    this.ricordaCredenziali = !this.ricordaCredenziali;
  }

  login() {
    let nErr = 0;

    if (this.username == '' || this.password == '') {
      this.toastr.warning('Email o password mancante...', 'Attenzione!');
      nErr++;
    }

    if (nErr == 0) {
      this.authService.loginCallHttp(this.username, this.password).subscribe(
        (data) => {
          if (
            data.token != undefined &&
            data.token != null &&
            data.token != ''
          ) {
            this.cookie.set('token', data.token);
            this.toastr.success('Accesso effettuatto...', 'Successo!');

            if (this.ricordaCredenziali) {
              this.cookie.set('username', this.username);
              this.cookie.set('password', this.password);
            }

            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 3000);
          }
        },
        (error) => {
          this.toastr.error('Email o password errati...', 'Attenzione!');
        }
      );
    }
  }
}
