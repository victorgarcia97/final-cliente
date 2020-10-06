import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Deporte } from 'src/app/interfaces/deporte';
import { TipoEvento } from 'src/app/interfaces/tipo-evento';
import { DeportesService } from 'src/app/services/deportes/deportes.service'
import { TipoEventoService } from 'src/app/services/TipoEvento/tipo-evento.service';

@Component({
  selector: 'app-tipos-evento-detail',
  templateUrl: './tipos-evento-detail.component.html',
  styleUrls: ['./tipos-evento-detail.component.css']
})
export class TiposEventoDetailComponent implements OnInit {

  estado: string;

  tipoEvento: TipoEvento

  listaDeportes: Deporte[];
  deporteSeleccionado: Deporte;



  mensajeBoton: string;

  closeResult: string;

  constructor(private modalService: NgbModal,
              private router: Router, 
              private route: ActivatedRoute, 
              private toastr: ToastrService, 
              private deporteService: DeportesService, 
              private tipoEventoService: TipoEventoService) { }

  ngOnInit(): void {
    switch(this.route.snapshot.routeConfig.path){
      case 'TiposEvento/CrearTipoEvento':
        this.estado = 'creacion';
        break;
      case 'TiposEvento/:id/Editar':
        this.estado = 'edicion';
        break;
    }

    if(this.estado === 'creacion'){
      this.recargar();
      this.mensajeBoton = "Añadir";
    }

    if(this.estado === 'edicion'){
      this.mensajeBoton = "Guardar";
      this.recargar();
      let idURL = +this.route.snapshot.paramMap.get('id');
      this.getTipoEvento(idURL);
    }
  }


  recargar(){
    this.tipoEvento = {
      "deporteId": undefined,
      "deporte": undefined,
      "competicion": undefined,
      "fechaInicio":undefined,
      "fechaFin": undefined
    }

    this.getDeportes();
  }

  getTipoEvento(id: number){
    this.tipoEventoService.getTipoEvento(id)
      .subscribe(response =>{
        this.tipoEvento = response;
      });
  }

  getDeportes(){
    this.deporteService.getDeportes()
          .subscribe(reponse => this.listaDeportes = reponse);
  }

  postTipoEvento(){
    if(!this.validar()){
      this.toastr.error("Complete los campos obligatorios, por favor");
      return;
    }

    if(!this.validarFechas()){
      this.toastr.error("La fecha de inicio no puede ser despues de la fecha fin");
      return;
    }

    this.tipoEventoService.postTipoEvento(this.tipoEvento)
      .subscribe(response => {
        this.recargar();
        this.toastr.success("Se ha creado el tipo de evento correctamente");
    });
  }

  putTipoEvento(){
    if(!this.validar()){
      this.toastr.error("No se puede modificar si no estan todos los campos obligatorios rellenados");
      return;
    }

    if(!this.validarFechas()){
      this.toastr.error("La fecha de inicio no puede ser despues de la fecha fin");
    }

    this.tipoEventoService.putTipoEvento(this.tipoEvento)
      .subscribe(response => {
        this.getTipoEvento(this.tipoEvento.id);
        this.toastr.info("El tipo de evento se ha modificado correctamente");
      });
  }

  deleteTipoEvento(){
    this.tipoEventoService.deleteTipoEvento(this.tipoEvento.id)
      .subscribe(response => {
        this.router.navigate(['TiposEvento']);
        this.toastr.success("Se ha borrado un tipo de evento");

      });
  }

  compruebaAccion(){
    if(this.estado === 'creacion'){
      this.postTipoEvento();
    }

    if(this.estado === 'edicion'){
      this.putTipoEvento();
    }
  }


  validar(): boolean {
    if(this.tipoEvento.competicion === undefined || this.tipoEvento.competicion === ""
      || this.tipoEvento.competicion === null || this.tipoEvento.fechaInicio === undefined || this.tipoEvento.fechaInicio === null || this.tipoEvento.fechaFin === undefined
      || this.tipoEvento.fechaFin === null){
        return false;
      }

      return true;
  }
  

  validarFechas(): boolean{

    let fechaIni = new Date(this.tipoEvento.fechaInicio);
    let fechaFin = new Date(this.tipoEvento.fechaFin)

    if(fechaIni.getTime() > fechaFin.getTime()){
      return false;
    }
    return true;
  }

  openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`
      if (result=="Launch click"){
        this.deleteTipoEvento();
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
