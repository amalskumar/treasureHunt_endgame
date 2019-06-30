import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RulesComponent } from './rules/rules.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes =[
    { path: 'home',             component: HomeComponent },
    { path: 'rules',     component: RulesComponent },
    { path: 'signup',           component: SignupComponent },
    { path: 'landing',          component: LandingComponent },
    { path: '', redirectTo: 'landing', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
