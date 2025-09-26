import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AccountTypeService } from '../../services/account.type.service';
import { AccountTypeResponse } from '../../interfaces/AccountTypeResponse';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  name: string = '';
  surname: string = '';
  username: string = ''; //lo username dell'utente in questo progetto corrisponde con l'indirizzo email
  emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  password: string = '';
  passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  confirmPassword: string = '';
  acceptGdprAndPrivacy: boolean = false;
  accountTypeSelected = 0;
  accountTypes = signal<AccountTypeResponse[]>([]);

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private accountTypeService: AccountTypeService
  ) {}

  ngOnInit(): void {
    this.accountTypeService.getAccountTypes().subscribe((data) => {
      this.accountTypes.set(data);
    });
  }

  setAcceptGdprAndPrivacy() {
    this.acceptGdprAndPrivacy = !this.acceptGdprAndPrivacy;
  }

  register() {
    let nErr = 0;

    if (this.name == '') {
      this.toastr.warning('Inserisci il nome...', 'Attenzione!');
      nErr++;
    }

    if (this.surname == '') {
      this.toastr.warning('Inserisci il cognome...', 'Attenzione!');
      nErr++;
    }

    if (this.username == '') {
      this.toastr.warning('Inserisci un indirizzo email...', 'Attenzione!');
      nErr++;
    }

    if (!this.emailRegex.test(this.username) && this.username != '') {
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

    if (!this.passwordRegex.test(this.password) && this.password != '') {
      this.toastr.warning(
        'La password deve contenere \n1 carattere maiuscolo, \n1 carattere minuscolo, \n1 numero, \n1 carattere speciale, \ne deve avere almeno 8 caratteri...',
        'Attenzione!'
      );
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

    if (this.acceptGdprAndPrivacy == false) {
      this.toastr.warning(
        'Devi accettare il GDPR e la Privacy per completare la registrazione',
        'Attenzione!'
      );
      nErr++;
    }

    if (this.accountTypeSelected == 0) {
      this.toastr.warning(
        'Seleziona la tipologia di account che vuoi aprire',
        'Attenzione!'
      );
      nErr++;
    }

    if (nErr == 0) {
      this.authService
        .registerCallHttp(
          this.name,
          this.surname,
          this.username,
          this.password,
          this.accountTypeSelected
        )
        .subscribe(
          (json) => {
            if (
              json.username != '' &&
              json.username != null &&
              json.username != undefined
            ) {
              this.toastr.success(
                'Ora puoi accedere alla tua dashboard',
                'Successo!'
              );
            }
          },
          (err) => {
            this.toastr.warning(
              'La mail è già stata utilizzata',
              'Attenzione!'
            );
          }
        );
    }
  }
}
