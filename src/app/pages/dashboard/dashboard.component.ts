import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { Router } from '@angular/router';
import { UserDetailsService } from '../../services/user.details/user.details.service';
import { BaseChartDirective } from 'ng2-charts';
import {ChartData, ChartOptions, ChartType} from "chart.js";
import SecureLS from "secure-ls";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, BaseChartDirective],
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
  cookie = new SecureLS();

  constructor(
    private router: Router,
    private userDetailsService: UserDetailsService
  ) {}

  ngOnInit(): void {
    console.log(this.cookie.get('token'));
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


  chartType: ChartType = 'bar';
  chartData: ChartData<'bar'> = {
    labels: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
    datasets: [{
      label: `Numero di analisi effettuate nel mese dell'anno corrente`,
      data: [1, 4, 0, 4, 0, 7, 3, 6, 7, 0, 0, 0],
      backgroundColor: 'rgba(65, 30, 98)',
    }]
  };
  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
}
