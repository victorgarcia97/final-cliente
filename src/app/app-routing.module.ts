import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TiposEventoComponent } from'src/app/components/tipos-evento/tipos-evento.component';
import { TiposApuestasDetailComponent } from './components/tipos-apuestas/tipos-apuestas-detail/tipos-apuestas-detail.component';
import { TiposApuestaComponent } from './components/tipos-apuestas/tipos-apuestas.component';
import { TiposEventoDetailComponent } from './components/tipos-evento/tipos-evento-detail/tipos-evento-detail.component';

const routes: Routes = [
  { path: "TiposEvento", component: TiposEventoComponent },
  { path: "TiposEvento/CrearTipoEvento", component: TiposEventoDetailComponent},
  { path: "TiposEvento/:id/Editar" , component: TiposEventoDetailComponent },
  { path: "TiposApuesta", component: TiposApuestaComponent },
  { path: "TiposApuesta/CrearTipoApuesta", component: TiposApuestasDetailComponent},
  { path: "TiposApuesta/:id/Editar", component: TiposApuestasDetailComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
