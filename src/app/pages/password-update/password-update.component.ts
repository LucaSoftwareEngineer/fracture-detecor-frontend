import { PasswordUpdateRequest } from './../../interfaces/PasswordUpdateRequest';
import { PasswordUpdateResponse } from '../../interfaces/PasswordUpdateResponse';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResetPasswordService } from '../../services/reset.password.service';

@Component({
  selector: 'app-password-update',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './password-update.component.html',
  styleUrl: './password-update.component.css',
})
export class PasswordUpdateComponent {
  username: string = '';
  emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  password: string = '';
  confirmPassword: string = '';
  opt: string = '';

  constructor(
    private resetPasswordService: ResetPasswordService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  update() {
    let nErr = 0;

    if (this.username == '') {
      this.toastr.warning('Inserisci un indirizzo email...', 'Attenzione!');
      nErr++;
    }

    if (!this.emailRegex.test(this.username)) {
      this.toastr.warning(
        'Inserisci un indirizzo email valido...',
        'Attenzione!'
      );
      nErr++;
    }

    if (this.password == '') {
      this.toastr.warning('Inserisci la password...', 'Attenzione!');
      nErr++;
    }

    if (this.confirmPassword == '') {
      this.toastr.warning(
        'Reinserisci la password nel box "Conferma Password"',
        'Attenzione!'
      );
      nErr++;
    }

    if (this.password != this.confirmPassword) {
      this.toastr.warning(
        'La password inserita e la password da confermare devono essere uguali',
        'Attenzione!'
      );
      nErr++;
    }

    if (this.opt == '') {
      this.toastr.warning(
        'Il codice OPT che hai inserito non è valido',
        'Attenzione!'
      );
      nErr++;
    }

    if (nErr == 0) {
      const json: PasswordUpdateRequest = {
        username: this.username,
        optResetPassword: this.opt,
        rawPassword: this.password,
      };
      this.resetPasswordService.update(json).subscribe(
        (res) => {
          this.toastr.success('Password modificata correttamente', 'Successo!');
          setInterval(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        (error) => {
          this.toastr.warning(
            'Il codice OPT che hai inserito non è valido',
            'Attenzione!'
          );
        }
      );
    }
  }
}
