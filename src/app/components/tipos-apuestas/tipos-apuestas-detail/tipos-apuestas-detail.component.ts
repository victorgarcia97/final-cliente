import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Deporte } from 'src/app/interfaces/deporte';
import { TipoApuesta } from 'src/app/interfaces/tipo-apuesta';
import { DeportesService } from 'src/app/services/deportes/deportes.service';
import { TipoApuestaService } from 'src/app/services/TipoApuesta/tipo-apuesta.service';

@Component({
  selector: 'app-tipos-apuestas-detail',
  templateUrl: './tipos-apuestas-detail.component.html',
  styleUrls: ['./tipos-apuestas-detail.component.css']
})
export class TiposApuestasDetailComponent implements OnInit {

  tituloPagina: string;

  listaRiesgo: string[] = ["Alto","Medio","Bajo"];

  listaDeportes: Deporte[];

  tipoApuesta: TipoApuesta;

  estado: string;
  closeResult: string;
  mensajeBoton: string;


  constructor(private modalService: NgbModal,
              private router: Router, 
              private route: ActivatedRoute, 
              private toastr: ToastrService, 
              private deporteService: DeportesService, 
              private tipoApuestaService: TipoApuestaService) { }

  ngOnInit(): void {
    switch(this.route.snapshot.routeConfig.path){
      case 'TiposApuesta/CrearTipoApuesta':
        this.estado = 'creacion';
        break;
      case 'TiposApuesta/:id/Editar':
        this.estado = 'edicion';
        break;
    }

    if(this.estado === 'creacion'){
      this.tituloPagina = 'Creación de tipo de apuesta';
      this.recargar();
      this.mensajeBoton = "Añadir";
    }

    if(this.estado === 'edicion'){
      
      this.mensajeBoton = "Guardar";
      this.recargar();
      let idURL = +this.route.snapshot.paramMap.get('id');
      this.getTipoApuesta(idURL);

    }
  }

  recargar(){
    this.tipoApuesta = {
      "descripcion": undefined,
      "multiplicador": undefined,
      "riesgo": undefined,
      "deporteId": undefined,
      "deporte": undefined
    }

    this.getDeportes();
  }

  getDeportes(){
    this.deporteService.getDeportes()
          .subscribe(reponse => this.listaDeportes = reponse);
  }

  getTipoApuesta(id: number){
    this.tipoApuestaService.getTipoApuesta(id)
      .subscribe(response => {
        this.tipoApuesta = response;
        this.tituloPagina = "Edición de tipo de apuesta: "+ response.descripcion; 
      })

  }

  postTipoApuesta(){ 
    if(!this.validar()){
      this.toastr.error("Rellene todos los campos obligatorios, por favor");
      return;
    }

    this.tipoApuestaService.postTipoApuesta(this.tipoApuesta)
      .subscribe(response => {
        this.recargar();
        this.toastr.success("Se ha creado el tipo de apuesta: "+ response.descripcion +"correctamente");
      })
  }

  putTipoApuesta(){
    if(!this.validar()){
      this.toastr.error("Rellene todos los campos obligatorios, por favor");
      return;
    }

    this.tipoApuestaService.putTipoApuesta(this.tipoApuesta)
      .subscribe(response => {
        this.getTipoApuesta(this.tipoApuesta.id);
        this.toastr.success("Se ha modificado el tipo de apuesta: "+ response.descripcion);
      })
  
  }

  deleteTipoApuesta(){
    this.tipoApuestaService.deleteTipoApuesta(this.tipoApuesta.id)
      .subscribe(response => {
        this.router.navigate(['TiposApuesta']);
        this.toastr.success("Se ha borrado el tipo de apuesta: " + response.descripcion);
      })
  }

  compruebaAccion(){
    if(this.estado === 'creacion'){
      this.postTipoApuesta();
    }

    if(this.estado === 'edicion'){
      this.putTipoApuesta();
    }
  }


  validar(): boolean {
    if(this.tipoApuesta.descripcion === undefined || this.tipoApuesta.descripcion === null || this.tipoApuesta.descripcion === ""
        || this.tipoApuesta.riesgo === null || this.tipoApuesta.riesgo === undefined || this.tipoApuesta.multiplicador === undefined
        || this.tipoApuesta.multiplicador === null){


          return false;
        }



      return true;
  }

  openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`
      if (result=="Launch click"){
        this.deleteTipoApuesta();
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
