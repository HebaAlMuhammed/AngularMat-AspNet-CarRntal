import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { IletisimComponent } from './components/iletisim/iletisim.component';


import { AdminComponent } from './components/admin/admin/admin.component';
import { AdminKatComponent } from './adminKat/adminKat.component';
import { AdminCarComponent } from './adminCar/adminCar.component';
import { AdminkullanciComponent } from './adminkullanci/adminkullanci.component';
import { AuthGuard } from './sevrices/AuthGuard';
import { ListcarComponent } from './listcar/listcar.component';
import { ListcategoryComponent } from './listcategory/listcategory.component';


const routes: Routes = [

    {
      path: '', component: HomeComponent
    },
     {
       path: 'admin',
        component: AdminComponent,
        canActivate : [AuthGuard],
        data :{
          yetkiler: ['admin'],
          gerigit: '/login'
        }
     }
   ,{
     path: 'admin/araba', 
     component: AdminCarComponent,
   
   }
   ,{
     path: 'admin/kategori',
      component: AdminKatComponent,
      canActivate : [AuthGuard],
      data :{
        yetkiler: ['Admin'],
        gerigit: '/login'
      }
   }
   ,{
     path: 'admin/uye', 
     component:AdminkullanciComponent,
     
  },
  {
    path: 'araba/:carId',
     component: ListcarComponent
  },
  {
    path: 'kategori/:katId',
     component: ListcategoryComponent
  },
  {
    path: 'login',
     component: LoginComponent
  },
  {
    path: 'iletesim', 
    component: IletisimComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
