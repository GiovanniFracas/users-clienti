import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";


@Component({
  template: `
<div class="sfondo" >
    <div id="loginQuad"class="text-center bg-dark text-white">
      <h2>FlixNet</h2>
         <div class="row justify-content-center">
              <div class="col-6">
                <form #f="ngForm" (ngSubmit)="submit(f)">
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input ngModel name="email" class="form-control" type="email" id="email" />
                  </div>
                  <div class="form-group">
                    <label for="pass">Password</label>
                    <input ngModel name="password" class="form-control" type="password" id="pass" />
                  </div>
                  <button  class="btn btn-secondary m-3" [disabled]="false" type="submit" >Entra
                  </button>
                  <button class="btn btn-secondary m-3" type="button" routerLink="/register">Registrati</button>
                </form>
                <button type="button" (click)="logout()">LOGOUT</button>
              </div>
            </div>
    </div>
  </div>
  `
})
export class loginPage implements OnInit {
  errorMessage: undefined;
  constructor(private authSrv: AuthService, private router:Router){}
  ngOnInit(): void {

  }
  async submit(form: any) {
    try {
      await this.authSrv.login(form.value).toPromise();
      form.reset();
      this.errorMessage = undefined;
      this.router.navigateByUrl('/home');
    } catch (error: any) {
      this.errorMessage = error
      console.error(error)
    }
  }
  logout(){
    this.authSrv.logout();
  }
}
