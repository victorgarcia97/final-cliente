import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/interfaces/evento';
import { EventoService } from 'src/app/services/evento/evento.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  listaEventos: Evento[];

  constructor(private eventosService: EventoService) { }

  ngOnInit(): void {
    this.listaEventos = [];
    this.getEventos();
  }

  getEventos(){
    this.eventosService.getEventos()
      .subscribe(response => this.listaEventos = response);
  }

}
