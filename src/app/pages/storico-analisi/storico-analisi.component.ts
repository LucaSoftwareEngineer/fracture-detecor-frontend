import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {AnalisiFratturaService} from "../../services/analisi.frattura/analisi.frattura.service";
import {UserDetailsService} from "../../services/user.details/user.details.service";
import {AnalisiFratturaItemStorico} from "../../interfaces/AnalisiFratturaItemStorico";
import {NgForOf} from "@angular/common";
import {API} from "../../api.config";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-storico-analisi',
  standalone: true,
  imports: [
    NavbarComponent,
    SidebarComponent,
    NgForOf
  ],
  templateUrl: './storico-analisi.component.html',
  styleUrl: './storico-analisi.component.css'
})
export class StoricoAnalisiComponent implements OnInit {

  elencoAnalisi:AnalisiFratturaItemStorico[] = [];
  api = new API();
  idUser: number = 0;

  constructor(
    private analisiFratturaService: AnalisiFratturaService,
    private userDetailsService: UserDetailsService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userDetailsService.getUserDetails().subscribe(
      json => {
        this.idUser = json.id;
        this.getStoricoAnalisi(this.idUser);
      }
    )
  }

  getStoricoAnalisi(idUser: number) {
    this.analisiFratturaService.callHttpStoricoAnalisiLastre(idUser).subscribe(
      res => {
        this.elencoAnalisi = res;
      }
    )
  }

  eliminaAnalisi(idAnalisi: number) {
    this.analisiFratturaService.callHttpEliminaAnalisiDaStorico(idAnalisi, this.idUser).subscribe(() => {
      this.toastr.success('Analisi eliminata correttamente...', 'Successo!');
      this.elencoAnalisi = [];
      this.getStoricoAnalisi(this.idUser);
    });
  }

}
