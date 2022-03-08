import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { homePage } from './page/home.page';
import { loginPage } from './page/login.page';
import { registerPage } from './page/register.page';


const routes: Routes= [
  {
    path: "register",
    component:registerPage
  },
  {
    path: "login",
    component:loginPage
  },
  {
    path: "register",
    component:registerPage
  },
  {
    path: "home",
    component:homePage
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
@NgModule({
  declarations: [
    AppComponent,
    loginPage,
    registerPage,
    homePage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
