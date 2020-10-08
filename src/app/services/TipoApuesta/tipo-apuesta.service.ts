import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TipoApuesta } from 'src/app/interfaces/tipo-apuesta';

@Injectable({
  providedIn: 'root'
})
export class TipoApuestaService {
  
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  

  constructor(private http: HttpClient) { }

  getTiposApuesta(): Observable<TipoApuesta[]> {
    return this.http.get<TipoApuesta[]>("http://localhost:5000/api/TiposApuesta")
  }

  getTipoApuesta(id: number): Observable<TipoApuesta>{
    return this.http.get<TipoApuesta>("http://localhost:5000/api/TiposApuesta/"+id);
  }

  postTipoApuesta(tipoApuesta: TipoApuesta): Observable<TipoApuesta> {
    return this.http.post<TipoApuesta>("http://localhost:5000/api/TiposApuesta", tipoApuesta, this.httpOptions);
  }

  deleteTipoApuesta(id: number) :Observable<TipoApuesta> {
    return this.http.delete<TipoApuesta>("http://localhost:5000/api/TiposApuesta/"+id,this.httpOptions);
  }

  putTipoApuesta(tipoApuesta: TipoApuesta): Observable<TipoApuesta> {
    return this.http.put<TipoApuesta>("http://localhost:5000/api/TiposApuesta/"+tipoApuesta.id,tipoApuesta,this.httpOptions);
  }

  getTiposApuestaPorDeporte(eventoId: number):Observable<TipoApuesta[]> {
    return this.http.get<TipoApuesta[]>("http://localhost:5000/api/TiposApuesta/PorDeporte/"+eventoId)

  }
}
