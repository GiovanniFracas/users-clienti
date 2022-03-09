import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { AuthData, ClientData } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  utente!: any;
  utenteVero!: AuthData;
  utenteid!: number;

  constructor(private http: HttpClient) { }
  async getClienti() {
    this.utente = localStorage.getItem('user');
    this.utenteVero = JSON.parse(this.utente);
    this.utenteid = this.utenteVero.user.id
    console.log(this.utenteid);
    return this.http.get(`http://localhost:4201/clienti?utenteid=${this.utenteid}`);
  }

  async aggiungiCliente(data: { nome: string; cognome: string; indirizzo: string; azienda: string; info: string; utenteid: number }) {
    data.utenteid=this.utenteid
    console.log("DATA" + JSON.stringify(data));

    return this.http.post<ClientData>(`http://localhost:4201/clienti`, data).subscribe(res => {
      console.log(res);
      this.getClienti();
    }
    )


  }
}
