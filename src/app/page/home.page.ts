import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { AuthService, ClientData } from "../auth.service";
import { ClientService } from "../client.service";

@Component({
  template: `
  <button type="button" class="btn btn-primary" (click)="isAggiunto=true">Aggiungi</button>
  <div *ngIf="isAggiunto">
  <form #f="ngForm" (ngSubmit)="submit(f)">
            <div class="form-group">
              <label for="nome">Nome</label>
              <input ngModel name="nome" class="form-control" type="text" id="nome" />
            </div>
            <div class="form-group">
              <label for="cognome">Cognome</label>
              <input ngModel name="cognome" class="form-control" type="text" id="email" />
            </div>
            <div class="form-group">
              <label for="indirizzo">indirizzo</label>
              <input ngModel name="indirizzo" class="form-control" type="text" id="pass" />
            </div>
            <div class="form-group">
              <label for="azienda">azienda</label>
              <input ngModel name="azienda" class="form-control" type="text" id="pass" />
            </div>
            <div class="form-group">
              <label for="info">info</label>
              <input ngModel name="info" class="form-control" type="text" id="pass" />
            </div>

            <button  class="btn btn-secondary mt-3" [disabled]="false" type="submit">Entra
            </button>


          </form>
  </div>

  <ul *ngFor="let cliente of clientiVeri">
    <li>{{cliente.nome}}</li>
  </ul>

  `
})
export class homePage implements OnInit {

  isAggiunto: boolean = false;
  clienti!: any;
  clientiVeri!: ClientData[]
  utenteid!: number;
  errorMessage: undefined;
  constructor(private authSrv: AuthService, private router: Router, private clientSrv: ClientService) { }
  ngOnInit(): void {
    this.getClienti()
  }
  async getClienti() {
    (await this.clientSrv.getClienti()).subscribe((res) => {
      console.log(res);
      this.clienti = res;
      this.clientiVeri = this.clienti;
      this.utenteid = this.clientSrv.utenteid;
      console.log(this.utenteid);
    });
  }

  async submit(form: any) {
    console.log(form);
    try {
      await (await this.clientSrv.aggiungiCliente(form.value))
      this.errorMessage = undefined
      this.isAggiunto = false;
      console.log(form.value);
      this.getClienti();

    } catch (error: any) {
      this.errorMessage = error
      console.error(error)
    }
  }

}
