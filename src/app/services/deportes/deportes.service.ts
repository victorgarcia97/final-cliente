import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Deporte } from 'src/app/interfaces/deporte';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeportesService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  

  constructor(private http: HttpClient) {

   }



  getDeportes(): Observable<Deporte[]> {
    return this.http.get<Deporte[]>("http://localhost:5000/api/Deportes");
  }

  getDeporte(id: number): Observable<Deporte> {
    return this.http.get<Deporte>("http://localhost:5000/api/Deportes/"+id);
  }
}
