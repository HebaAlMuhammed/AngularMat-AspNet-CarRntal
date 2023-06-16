import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { IletisimComponent } from './components/iletisim/iletisim.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MayNavComponent } from './components/may-nav/may-nav.component';
import { MaterialModule } from './material.module';
import { CategorySolutoinComponent } from './Category-solutoin/Category-solutoin.component';
import { AdminKatComponent } from './adminKat/adminKat.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { AlertComponent } from './alert/alert.component';
import { CarSoruComponent } from './CarSoru/CarSoru.component';
import { AdminCarComponent } from './adminCar/adminCar.component';
import { KullancisoruComponent } from './kullancisoru/kullancisoru.component';
import { AdminkullanciComponent } from './adminkullanci/adminkullanci.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ApiService } from './sevrices/api.service';
import { AlertService } from './sevrices/alert.service';
import { AuthInterceptor } from './sevrices/AuthInterceptor.service';
import { AuthGuard } from './sevrices/AuthGuard';
import { ListcarComponent } from './listcar/listcar.component';
import { ListcategoryComponent } from './listcategory/listcategory.component';
import { FotoComponent } from './foto/foto.component';



@NgModule({
  declarations: [																					
    AppComponent,
      LoginComponent,
      HomeComponent,
      IletisimComponent,
      MayNavComponent,
      CategorySolutoinComponent,
      AdminKatComponent,
      ConfirmationComponent,
      AlertComponent,
      CarSoruComponent,
      AdminCarComponent,
      KullancisoruComponent,
      AdminkullanciComponent,
   
      ListcarComponent,
      ListcategoryComponent,
      FotoComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
   MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule
    
  ],
  
  // entryComponents: [
  //   AlertDialogComponent,
  //   ConfirmDialogComponent,


 // ],
  providers: [ApiService, AlertService, AuthGuard,
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
],
  bootstrap: [AppComponent]
})
export class AppModule { }
