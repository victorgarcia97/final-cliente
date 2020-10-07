import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { TiposEventoComponent } from './components/tipos-evento/tipos-evento.component';
import { TiposApuestaComponent } from './components/tipos-apuestas/tipos-apuestas.component';
import { TiposEventoDetailComponent } from './components/tipos-evento/tipos-evento-detail/tipos-evento-detail.component';
import { TiposApuestasDetailComponent } from './components/tipos-apuestas/tipos-apuestas-detail/tipos-apuestas-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    TiposEventoComponent,
    TiposApuestaComponent,
    TiposEventoDetailComponent,
    TiposApuestasDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
