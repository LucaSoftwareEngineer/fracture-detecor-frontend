import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { Router } from '@angular/router';
import { UserDetailsService } from '../../services/user.details/user.details.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  numeroAnalisiConFrattura: number = 0;
  numeroAnalisiSenzaFrattura: number = 0;
  percentualeMediaAccuratezzaAnalisi: number = 0;
  name: string = '';
  surname: string = '';
  username: string = '';
  type: string = '';

  constructor(
    private router: Router,
    private userDetailsService: UserDetailsService
  ) {}

  ngOnInit(): void {
    this.userDetailsService.getUserDetails().subscribe((json) => {
      this.name = json.name;
      this.surname = json.surname;
      this.username = json.username;
      this.numeroAnalisiConFrattura = json.numeroAnalisiConFrattura;
      this.numeroAnalisiSenzaFrattura = json.numeroAnalisiSenzaFrattura;
      this.percentualeMediaAccuratezzaAnalisi =
        json.percentualeMediaAccuratezzaAnalisi;
      if (json.type == 'Doctor') {
        this.type = 'Utente Medico';
      } else {
        this.type = 'Utente Standard';
      }
    });
  }
}
