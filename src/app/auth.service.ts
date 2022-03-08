import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

export interface AuthData {
  accessToken: string;
  user: {
    nome: string;
    email: string;
    password: string;
    id:number
    ruolo:'admin'|'cont'|'commerce'
  };
}
export interface ClientData{
  id: number;
  nome: string;
  cognome:string;
  indirizzo:string;
  azienda:string;
  info:string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authsubj = new BehaviorSubject<null | AuthData>(null)
  user$ = this.authsubj.asObservable()

  autologoutTimer!: any;
  isLogged!: boolean;

  jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient, private router: Router){}

  register(data: { email: string; password: string }) {
    return this.http.post<AuthData>(`http://localhost:4201/users/register`, data).pipe(
      tap((data) => {
        console.log(data);
        this.authsubj.next(data);
        localStorage.setItem('user', JSON.stringify(data))
        this.autoLogout(data);
      }),
     /*  catchError(this.errors) */
    );
  }

  logout() {
    this.authsubj.next(null)
    this.router.navigate(["/login"])
    localStorage.removeItem('user')
    if (this.autologoutTimer) {
      clearTimeout(this.autologoutTimer)
    }
    this.isLogged = false;
  }
  autoLogout(data: AuthData) {
    const inizioToken: any = this.jwtHelper.getTokenExpirationDate(data.accessToken) as Date;
    const expMs = inizioToken.getTime() - new Date().getTime();
    this.autologoutTimer = setTimeout(() => {
      this.logout()
    }, expMs);
    this.isLogged = false;
  }
  login(data: { email: string; password: string }) {
    return this.http.post<AuthData>(`http://localhost:4201/login`, data).pipe(
      tap((data) => {
        console.log(data);
        this.authsubj.next(data);
        localStorage.setItem('user', JSON.stringify(data))
        this.autoLogout(data);
        this.isLogged = true;
      }),
      catchError(this.errors)
    );
  }
  private errors(err: any) {
    // console.error(err)
    switch (err.error) {
      case "Email and password are required":
        return throwError("Email e password sono obbligatorie");
        break;
      case "Email already exists":
        return throwError("Utente gia registrato");
        break;
      case "Email format is invalid":
        return throwError("Email scritta male");
        break;
      case "Cannot find user":
        return throwError("Utente non esiste");
        break;

      default:
        return throwError("Errore nella chiamata");
        break;
    }
  }

}
