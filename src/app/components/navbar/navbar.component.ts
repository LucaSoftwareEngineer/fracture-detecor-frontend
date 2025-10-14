import { AfterViewInit, Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { UserDetailsService } from '../../services/user.details/user.details.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, AfterViewInit {
  name: string = '';
  surname: string = '';
  username: string = '';

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private userDetailsService: UserDetailsService
  ) {}

  ngOnInit(): void {
    initFlowbite();
    this.authService.checkLoginIsTrue().subscribe(
      (isValido) => {
        if (isValido == false) {
          this.router.navigate(['login']);
        }
      },
      (err) => {
        this.router.navigate(['login']);
      }
    );
    this.userDetailsService.getUserDetails().subscribe((json) => {
      this.username = json.username;
      this.name = json.name;
      this.surname = json.surname;
    });
  }

  ngAfterViewInit() {
    initFlowbite();
  }

  navbarLogoutButton() {
    const logout = this.authService.logoutDestroyToken();
    if (logout) {
      this.toastr.success('Logout effettuato correttamente...', 'Successo!');
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
    } else {
      this.toastr.error(
        'Qualcosa è andato storto riprova più tardi...',
        'Attenzione!'
      );
    }
  }
}
