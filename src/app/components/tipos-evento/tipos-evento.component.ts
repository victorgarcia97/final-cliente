import { Component, OnInit } from '@angular/core';
import { TipoEvento } from 'src/app/interfaces/tipo-evento';
import { TipoEventoService } from 'src/app/services/TipoEvento/tipo-evento.service';

@Component({
  selector: 'app-tipos-evento',
  templateUrl: './tipos-evento.component.html',
  styleUrls: ['./tipos-evento.component.css']
})
export class TiposEventoComponent implements OnInit {

  listaTiposEvento: TipoEvento[];

  constructor(private tipoEventoService: TipoEventoService) { }

  ngOnInit(): void {
    this.getTiposEventos();

  }

  getTiposEventos(){
    this.tipoEventoService.getTiposEventos()
          .subscribe(response => this.listaTiposEvento = response);
  }

}
