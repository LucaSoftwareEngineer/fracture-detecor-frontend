import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {BaseChartDirective} from "ng2-charts";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {UserDetailsService} from "../../services/user.details/user.details.service";
import {AnalisiFratturaService} from "../../services/analisi.frattura/analisi.frattura.service";

@Component({
  selector: 'app-nuova-analisi',
  standalone: true,
  imports: [
    NavbarComponent,
    SidebarComponent,
    BaseChartDirective,
    CommonModule,
    FormsModule
  ],
  templateUrl: './nuova-analisi.component.html',
  styleUrl: './nuova-analisi.component.css'
})
export class NuovaAnalisiComponent implements OnInit {
  fase: number = 0;
  fratturaPresente: boolean = false;
  dataAnalisi: Date | null = null;
  fileLastra: File | null = null;
  fileLastraCaricato: boolean = false;
  idUser: number = 0;
  nErr = 0;

  constructor(
    private toastr: ToastrService,
    private userDetailsService: UserDetailsService,
    private analisiFratturaService: AnalisiFratturaService
  ) {
  }

  ngOnInit(): void {
    this.userDetailsService.getUserDetails().subscribe(json => {
      this.idUser = json.id;
    });
  }

  fileLastraSelezionato(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.fileLastra = fileList[0];
      this.fileLastraCaricato = true;
      this.toastr.success('File della lastra caricato correttamente...', 'Successo!');
    }
  }

  beginAnalisiFrattura(): void {
    this.nErr = 0;

    if (this.fileLastra == null) {
      this.toastr.warning('Caricare il file della lastra...', 'Attenzione!');
      this.nErr++;
    }

    if (this.dataAnalisi == null) {
      this.toastr.warning('Inserire la data analisi...', 'Attenzione!');
      this.nErr++;
    }

    if (this.fileLastra && this.fileLastraCaricato && this.dataAnalisi && (this.idUser != 0) && (this.nErr == 0)) {
      this.toastr.success('Analisi della frattura avviata...', 'Successo!');
      this.fase = 1;
      const formData = new FormData();
      formData.append('dataAnalisi', this.dataAnalisi.toString().concat('T00:01:00'));
      formData.append('fileLastra', this.fileLastra, this.fileLastra.name);
      formData.append('userId', this.idUser.toString());
      this.analisiFratturaService.callHttpAnalisiLastra(formData).subscribe(
        json => {
          this.fratturaPresente = json.frattura;
          this.endAnalisiFrattura();
        },
        err => {
          this.toastr.error('Si è verificato un problema effettua il logout e riprova più tardi...', 'Attenzione!');
        }
      )
    }
  }

  endAnalisiFrattura(): void {
    this.toastr.success('Analisi della frattura completata correttamente!', 'Successo!');
    this.fase = 2;
  }

}
