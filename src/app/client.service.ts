import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { AuthData, ClientData } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  utente!: any;
  utenteVero!: AuthData;
  utenteId!: number;

  constructor(private http: HttpClient) { }
  async getClienti() {
    this.utente = localStorage.getItem('user');
    this.utenteVero = JSON.parse(this.utente);
    this.utenteId = this.utenteVero.user.id
    console.log(this.utenteId);
    return this.http.get(`http://localhost:4201/clienti?utenteid=${this.utenteId}`);
  }

  async aggiungiCliente(data:{nome: string; cognome: string; indirizzo: string; azienda:string; info:string; utenteid:number } ) {

    return this.http.post(`http://localhost:4201/clienti`, data).pipe(
      tap((data)=>{
        console.log(data);

      })
    )


  }
}
