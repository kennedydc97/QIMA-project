import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { environment } from './enviroment/enviroment';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { RestrictedActionDialogComponent } from './restricted-action-dialog/restricted-action-dialog.component';
import { AppRoutingModule } from './app-routing-module';

@NgModule({
  declarations: [
    AppComponent,
    ProductDialogComponent,
    HomeComponent,
    LoginComponent,
    RestrictedActionDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatTableModule,
    MatDialogModule, 
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    HttpClientModule,
    MatTooltipModule,
    MatSortModule,
    AppRoutingModule,
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: 'BASE_API_URL', useValue: environment.apiUrl },
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
