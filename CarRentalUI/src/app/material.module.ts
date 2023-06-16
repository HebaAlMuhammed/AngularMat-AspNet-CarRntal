import {  CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import{MatFormFieldModule} from '@angular/material/form-field'
import{MatButtonModule} from  '@angular/material/button';
import{MatIconModule} from  '@angular/material/icon';
import{MatDividerModule} from  '@angular/material/divider';

import{MatTableModule} from '@angular/material/table';
import{ MatPaginatorModule} from "@angular/material/paginator"
import{MatDialogModule} from '@angular/material/dialog';
import{MatMenuModule} from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import{MatListModule} from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';
import{MatInputModule} from '@angular/material/input'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import {MatTreeModule} from '@angular/material/tree';

// const MatModuller = [
//   MatButtonModule,
//   MatIconModule,
//   MatDividerModule,
//   MatCardModule,
//   MatToolbarModule,
//   MatDialogModule,
//   MatSidenavModule,
//   MatListModule,
//   MatTableModule,
//   MatSortModule,
//   MatPaginatorModule,
//   MatInputModule,
//   MatMenuModule,
//   MatFormFieldModule,
//   MatSelectModule
  
//];

@NgModule({
  imports: [MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatToolbarModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTreeModule
  
  ],
  exports: [MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatToolbarModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTreeModule
  
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MaterialModule { }
