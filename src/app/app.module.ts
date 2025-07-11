import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LoginModule,
    HomeModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [provideZoneChangeDetection({ eventCoalescing: true}), provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
