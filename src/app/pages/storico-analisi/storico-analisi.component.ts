import {Component} from '@angular/core';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {SidebarComponent} from "../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-storico-analisi',
  standalone: true,
  imports: [
    NavbarComponent,
    SidebarComponent
  ],
  templateUrl: './storico-analisi.component.html',
  styleUrl: './storico-analisi.component.css'
})
export class StoricoAnalisiComponent {
}
