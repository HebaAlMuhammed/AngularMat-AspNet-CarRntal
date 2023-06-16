import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Sonuc } from '../../models/Sonuc';
import { AlertService } from '../../sevrices/alert.service';
import { ConfirmationComponent } from 'src/app/confirmation/confirmation.component';
import { ApiService } from 'src/app/sevrices/api.service';
import { Car } from 'src/app/models/Car';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  arabalar : Car[]  = [];
  confirmDialogRef: MatDialogRef<ConfirmationComponent>|null = null;
  constructor(
    public alert: AlertService,
    public apiServis : ApiService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.ArabaListe();
  }
ArabaListe(){
  this.apiServis.ArabaListe().subscribe((d : object)=>{
    this.arabalar= d as Car[];
  })
}

}
