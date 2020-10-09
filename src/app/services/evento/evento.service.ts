import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from 'src/app/interfaces/evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>("http://localhost:5000/api/Eventos");
  }

  getEvento(id: number): Observable<Evento> {
    return this.http.get<Evento>("http://localhost:5000/api/Eventos/"+id);
  }

  postEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>("http://localhost:5000/api/Eventos",evento, this.httpOptions);
  }

  putEvento(evento:Evento): Observable<Evento> {
    return this.http.put<Evento>("http://localhost:5000/api/Eventos/"+evento.id,evento,this.httpOptions);
  }

  deleteEvento(id: number): Observable<Evento> {
    return this.http.delete<Evento>("http://localhost:5000/api/Eventos/"+id);
  }
}
