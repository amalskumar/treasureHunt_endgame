import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RulesComponent } from './rules/rules.component';
import { SignupComponent } from './signup/signup.component';
import { ClaimpointComponent } from './claimpoint/claimpoint.component';
import { AuthenticationGuard } from 'microsoft-adal-angular6';
import { FoundstoneComponent } from './claimpoint/foundstone/foundstone.component';
import { TriviaComponent } from './trivia/trivia.component';
import { LandingComponent } from './landing/landing.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard]   },
  { path: 'rules', component: RulesComponent },
  // { path: 'claim-stone', component: FoundstoneComponent},
  // { path: 'signup', component: SignupComponent},
  { path: 'landing', component: LandingComponent },
  { path: 'trivia', component: TriviaComponent},
  // { path: 'claimpoint/:id', component: ClaimpointComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
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
