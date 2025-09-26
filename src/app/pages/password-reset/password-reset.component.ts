import { PasswordResetRequest } from './../../interfaces/PasswordResetRequest';
import { ResetPasswordService } from './../../services/reset.password.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css',
})
export class PasswordResetComponent implements OnInit {
  username: string = '';

  constructor(
    private resetPasswordService: ResetPasswordService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  reset() {
    const json: PasswordResetRequest = {
      username: this.username,
    };
    this.resetPasswordService.reset(json).subscribe(
      (res) => {
        this.toastr.success(
          'Richiesta di recupero password ricevuta, a breve riceverai una mail con le istruzioni',
          'Successo!'
        );
      },
      (error) => {
        this.toastr.warning(
          "L'indirizzo mail inserito non è valido...",
          'Attenzione!'
        );
      }
    );
  }
}
