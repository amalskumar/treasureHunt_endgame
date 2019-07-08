import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CountdownModule } from 'ngx-countdown';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { RulesComponent } from './rules/rules.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { TriviaComponent } from './trivia/trivia.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiserviceService } from './services/apiservice.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClaimpointComponent } from './claimpoint/claimpoint.component';
import { NgxThanosModule } from '@wellwind/ngx-thanos';
import { MsAdalAngular6Service, MsAdalAngular6Module } from 'microsoft-adal-angular6';
import { InsertAuthTokenInterceptor } from './services/insert-auth-token-interceptor';
import { AuthenticationGuard } from 'microsoft-adal-angular6';
import { FoundstoneComponent } from './claimpoint/foundstone/foundstone.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    RulesComponent,
    NavbarComponent,
    FooterComponent,
    ClaimpointComponent,
    FoundstoneComponent,
    HomeComponent,
    TriviaComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    CountdownModule,
    RouterModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    NgxSpinnerModule,
    MatInputModule,
    MatRippleModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxThanosModule,
    MsAdalAngular6Module.forRoot({
      tenant: '3ec4eda1-a5d1-433d-90da-8dc791283d95', // HRB Tenant
      clientId: '18d61313-a5d1-4db8-8761-c773b5e48d0d', // EmgGame ID
      authority: 'https://login.microsoftonline.com/3ec4eda1-a5d1-433d-90da-8dc791283d95',
      cacheLocation: 'sessionStorage',
      redirectUri: 'http://localhost:4200/claim-stone',
      postLogoutRedirectUri: 'http://localhost:4200.world/',
      navigateToLoginRequestUrl: false,
    })

  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
  ],
  entryComponents: [
  ],
  providers: [ApiserviceService, MsAdalAngular6Service,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InsertAuthTokenInterceptor,
      multi: true
    }, AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
