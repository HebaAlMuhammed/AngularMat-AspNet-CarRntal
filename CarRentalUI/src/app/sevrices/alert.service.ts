import { Injectable } from '@angular/core';
import { Sonuc } from '../models/Sonuc';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertDialogref: MatDialogRef<AlertComponent>| null = null;;
  constructor(
    private matDialog: MatDialog
  ) { }

  AlertUygula(s: Sonuc) {
    var baslik = "";
    if (s.islem) {
      baslik = "Tamam";
    } else {
      baslik = "Hata";
    }
    this.alertDialogref = this.matDialog.open(AlertComponent, {
      width: "300px"
    });

    this.alertDialogref.componentInstance.dialogBaslik = baslik;
    this.alertDialogref.componentInstance.dialogMesaj = s.mesaj;
    this.alertDialogref.componentInstance.dialogIslem = s.islem;
    this.alertDialogref.afterClosed().subscribe(d => {
      this.alertDialogref = null;
    });

  }
}

