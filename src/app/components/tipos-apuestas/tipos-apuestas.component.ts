import { Component, OnInit } from '@angular/core';
import { TipoApuesta } from 'src/app/interfaces/tipo-apuesta';
import { TipoApuestaService } from 'src/app/services/TipoApuesta/tipo-apuesta.service';

@Component({
  selector: 'app-tipos-apuestas',
  templateUrl: './tipos-apuestas.component.html',
  styleUrls: ['./tipos-apuestas.component.css']
})
export class TiposApuestaComponent implements OnInit {

  listaTiposApuesta: TipoApuesta[];

  constructor(private tipoApuestaService: TipoApuestaService) { }

  ngOnInit(): void {
    this.getTiposApuestas();
  }

  getTiposApuestas(){
    this.tipoApuestaService.getTiposApuesta()
      .subscribe(response => this.listaTiposApuesta = response);
  }

}
