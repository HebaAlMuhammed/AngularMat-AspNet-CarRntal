import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  dialogBaslik: string ="";
  dialogMesaj: string = "";
  dialogIslem: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AlertComponent>

  ) { }

  ngOnInit() {
  }

}
