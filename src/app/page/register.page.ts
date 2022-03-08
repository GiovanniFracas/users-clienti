import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-registration',
  template: `
  <div class="sfondo">
  <div id="loginQuad"class="text-center bg-dark text-white">

  <div class="row justify-content-center">
        <div class="col-6">

        <form #f="ngForm" (ngSubmit)="submit(f)">
            <div class="form-group">
              <label for="nome">Nome Completo</label>
              <input ngModel name="nome" class="form-control" type="text" id="nome" />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input ngModel name="email" class="form-control" type="email" id="email" />
            </div>
            <div class="form-group">
              <label for="pass">Password</label>
              <input ngModel name="password" class="form-control" type="password" id="pass" />
            </div>
            <select ngModel name="ruolo" class="form-select my-3" aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="admin">Amministratore</option>
            <option value="cont">Contabile</option>
            <option value="commerce">Commerciale</option>
          </select>
            <button  class="btn btn-secondary mt-3" [disabled]="false" type="submit">Entra
            </button>
            <button type="button" class="btn btn-secondary mt-3" routerLink="/login">Login</button>

          </form>
        </div>
      </div>
  </div>
  </div>
  `,
})
export class registerPage implements OnInit {
  constructor(private authSrv: AuthService, private router: Router) { }
  errorMessage: undefined;
  ngOnInit(): void {
  }
  async submit(form: any) {
    try {
      await this.authSrv.register(form.value).toPromise()
      form.reset()
      this.errorMessage = undefined
      this.router.navigateByUrl('/home');
    } catch (error: any) {
      this.errorMessage = error
      console.error(error)
    }
  }
}
