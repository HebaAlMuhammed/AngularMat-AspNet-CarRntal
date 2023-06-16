import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from '../models/Category';
import { CategorySolutoinComponent } from '../Category-solutoin/Category-solutoin.component';
import { Sonuc } from '../models/Sonuc';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


import { AlertService } from '../sevrices/alert.service';
import { ApiService } from '../sevrices/api.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-adminKat',
  templateUrl: './adminKat.component.html',
  styleUrls: ['./adminKat.component.css']
})
export class AdminKatComponent implements OnInit {
  kategoriler: Category[] = [];

  displayedColumns = ['CategoryName', 'CarCategoryCount', 'Detay'];
  dataSource: any;
  @ViewChild(MatSort)
  Sort: MatSort = new MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dialogRefConfim!: MatDialogRef<ConfirmationComponent>;

  dialogRef!: MatDialogRef<CategorySolutoinComponent>;

  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: AlertService
  ) { }

  ngOnInit() {
    this.KategoriListe();
  }
  KategoriListe() {
    this.apiServis.KategoriListe().subscribe((d: object) => {
      this.kategoriler = d as Category[];
      this.dataSource = new MatTableDataSource(d as unknown[]);
      this.dataSource.sort = this.Sort;
      this.dataSource.paginator = this.paginator;

    });
  }
  Ekle() {
    var yenikayit: Category = new Category();
    this.dialogRef = this.matDialog.open(CategorySolutoinComponent,
      {
        width: "400px",
        data: {
          kayit: yenikayit,
          islem: 'ekle'
        }
      }

    );
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KategoriEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KategoriListe();
          }
        })
      }
      console.log(d);

    });
  }

  Duzenle(kayit: Category) {
    this.dialogRef = this.matDialog.open(CategorySolutoinComponent,
      {
        width: "400px",
        data: {
          kayit: kayit,
          islem: 'duzenle'
        }

      });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        kayit.CategoryName = d.CategoryName;
        this.apiServis.KategoriDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KategoriListe();
          }
        })
      }
      console.log(d);
    });
  }

  Sil(kayit: Category) {
    this.dialogRefConfim = this.matDialog.open(ConfirmationComponent,
      {
        width: "400px",
      });
    this.dialogRefConfim.componentInstance.dialogMesaj = kayit.CategoryName + " kategoryisi silinecek onaylıyor musunuuz"
    this.dialogRefConfim.afterClosed().subscribe(d => {
      if (d) {
        kayit.CategoryName = d.CategoryName;
        this.apiServis.KategoriSil(kayit.CategoryId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KategoriListe
          }
        })
      }
    })
  }

}
