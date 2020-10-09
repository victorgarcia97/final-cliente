import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Deporte } from 'src/app/interfaces/deporte';
import { Evento } from 'src/app/interfaces/evento';
import { TipoApuesta } from 'src/app/interfaces/tipo-apuesta';
import { TipoEvento } from 'src/app/interfaces/tipo-evento';
import { DeportesService } from 'src/app/services/deportes/deportes.service';
import { EventoService } from 'src/app/services/evento/evento.service';
import { TipoApuestaService } from 'src/app/services/TipoApuesta/tipo-apuesta.service';
import { TipoEventoService } from 'src/app/services/TipoEvento/tipo-evento.service';

@Component({
  selector: 'app-evento-detail',
  templateUrl: './evento-detail.component.html',
  styleUrls: ['./evento-detail.component.css']
})
export class EventoDetailComponent implements OnInit {

  estado: string;

  listaTiposApuestaPorDeporte: TipoApuesta[];
  listaTiposEvento: TipoEvento[];
  listaDeportes: Deporte[];
  listaTiposApuestaAVincular: TipoApuesta[];

  tipoApuestaSeleccionada: TipoApuesta;

  evento: Evento;

  closeResult: string;

  mensajeBoton: string;
  tituloPagina: string;

  constructor(private tiposApuestaService: TipoApuestaService,
              private deportesService: DeportesService,
              private modalService: NgbModal,
              private tiposEventoService: TipoEventoService,
              private route: ActivatedRoute,
              private eventosService: EventoService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    switch(this.route.snapshot.routeConfig.path){
      case 'Eventos/CrearEvento':
        this.estado = 'creacion';
        break;
      case 'Eventos/:id/Editar':
        this.estado = 'edicion';
        break;
    }

    if(this.estado === 'creacion'){
      this.mensajeBoton = 'Añadir';
      this.tituloPagina = "Creacion de eventos";
      this.recargar();
    }

    if(this.estado === 'edicion'){
      this.mensajeBoton = 'Guardar';
      this.recargar();
      let idURL = +this.route.snapshot.paramMap.get('id');
      this.getEvento(idURL);
    }
  }


  recargar() {
    this.evento = {
      "codigo": undefined,
      "nombre": undefined,
      "tipoEventoId": undefined,
      "activo": false,
      "tiposApuesta": undefined
    }

    this.tipoApuestaSeleccionada = {
      "id": undefined,
    }

    this.getDeportes();
    this.getListaTiposEventos();
    this.listaTiposApuestaAVincular = [];
    this.listaTiposApuestaPorDeporte = [];
  }


  getListaTiposApuestaPorDeporte(){
    this.tiposApuestaService.getTiposApuestaPorDeporte(this.evento.tipoEventoId) 
      .subscribe(response => this.listaTiposApuestaPorDeporte = response);
  }

  getDeportes(){
    this.deportesService.getDeportes()
      .subscribe(response => this.listaDeportes = response);
  }

  getListaTiposEventos(){
    this.tiposEventoService.getTiposEventos()
      .subscribe(response => this.listaTiposEvento = response);
  }

  getEvento(idURL: number){
    this.eventosService.getEvento(idURL)
      .subscribe(response => {
        this.evento = response;
        console.log(response);
        this.listaTiposApuestaAVincular = response.tiposApuesta;
        this.getListaTiposApuestaPorDeporte();
        this.tituloPagina = "Edición del evento: "+ response.nombre;
      });
  }

  postEvento(){

    if(!this.validar()){
      this.toastr.error("Rellene todos los campos obligatorios, por favor.");
      return;
    }

    if(this.evento.codigo.length >= 15){
      this.toastr.error("El codigo no puede tener mas de 15 caracteres.");
      return;
    }

    if(this.listaTiposApuestaAVincular.length === 0){
      this.toastr.error("Se debe asignar al menos un tipo de apuesta");
      return;
    }

    this.evento.tiposApuesta = this.listaTiposApuestaAVincular;
    
    this.eventosService.postEvento(this.evento)
      .subscribe(response => {
        this.toastr.success("Se ha creado el evento "+this.evento.nombre+" correctamente"); 
        this.recargar();
      });
  }

  putEvento(){
    
    if(!this.validar()){
      this.toastr.error("Rellene todos los campos obligatorios, por favor.");
      return;
    }

    if(this.evento.codigo.length >= 15){
      this.toastr.error("El codigo no puede tener mas de 15 caracteres.");
      return;
    }

    if(this.listaTiposApuestaAVincular.length === 0){
      this.toastr.error("Se debe asignar al menos un tipo de apuesta");
      return;
    }

    this.evento.tiposApuesta = this.listaTiposApuestaAVincular;
    
    this.eventosService.putEvento(this.evento)
      .subscribe(response => {
        this.toastr.success("Modificado el evento: "+response.nombre);
        this.evento = response;
      })
  }

  deleteEvento(){
    this.eventosService.deleteEvento(this.evento.id)
      .subscribe(response => {
        this.toastr.success("Se ha borrado el evento "+response.nombre+" correctamente");
        this.router.navigate(["Eventos"]);
      });
  }

  

  compruebaAccion(){
    if(this.estado === 'creacion'){
      this.postEvento();
      return;
    }
    if(this.estado === 'edicion'){
      this.putEvento();
      return;
    }
  }

  quitarListaTiposApuestaAVincular(tipoApuesta: TipoApuesta){
    let index = this.listaTiposApuestaAVincular.indexOf(tipoApuesta);
    this.listaTiposApuestaAVincular.splice(index,1);
  }

  validar(){
    if(this.evento.codigo === undefined || this.evento.codigo === "" ||
       this.evento.nombre === undefined || this.evento.nombre === "" || 
       this.evento.tipoEventoId === undefined ){
         return false;
       }

       return true;
  }


  comprubaTipoApuestaAVincular(){
    let comprobar = true;
    this.listaTiposApuestaAVincular.forEach(element => {
      if(element.id === this.tipoApuestaSeleccionada.id){
        this.toastr.error("No se pueden añadir duplicados");
        comprobar = false;
      }
    });

    if(comprobar){
      this.listaTiposApuestaAVincular.push(this.tipoApuestaSeleccionada);
    }
    return;
  }
    

  openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`
      if (result=="Launch click"){
        this.deleteEvento();
        }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
