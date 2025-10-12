import {Component} from '@angular/core';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {SidebarComponent} from "../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-nuova-analisi',
  standalone: true,
  imports: [
    NavbarComponent,
    SidebarComponent
  ],
  templateUrl: './nuova-analisi.component.html',
  styleUrl: './nuova-analisi.component.css'
})
export class NuovaAnalisiComponent {

}
