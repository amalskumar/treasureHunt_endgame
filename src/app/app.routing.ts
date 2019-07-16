import { LoginComponent } from './shared/login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RulesComponent } from './rules/rules.component';
import { AuthenticationGuard } from 'microsoft-adal-angular6';
import { LandingComponent } from './landing/landing.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'game', component: LandingComponent, canActivate: [AuthenticationGuard]},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

// canActivate: [AuthenticationGuard]

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
