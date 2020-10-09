import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoEvento } from 'src/app/interfaces/tipo-evento';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipoEventoService {
  
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  

  constructor(private http: HttpClient) { }

  getTiposEventos(): Observable<TipoEvento[]> {
    return this.http.get<TipoEvento[]>("http://localhost:5000/api/TiposEvento")
  }

  getTipoEvento(id: number): Observable<TipoEvento>{
    return this.http.get<TipoEvento>("http://localhost:5000/api/TiposEvento/"+id);
  }

  postTipoEvento(tipoEvento: TipoEvento): Observable<TipoEvento> {
    return this.http.post<TipoEvento>("http://localhost:5000/api/TiposEvento", tipoEvento, this.httpOptions);
  }

  deleteTipoEvento(id: number) :Observable<TipoEvento> {
    return this.http.delete<TipoEvento>("http://localhost:5000/api/TiposEvento/"+id,this.httpOptions);
  }

  putTipoEvento(tipoEvento: TipoEvento): Observable<TipoEvento> {
    return this.http.put<TipoEvento>("http://localhost:5000/api/TiposEvento/"+tipoEvento.id,tipoEvento,this.httpOptions);
  }
}
