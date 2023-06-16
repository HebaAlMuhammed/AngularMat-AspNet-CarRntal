import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../models/User';
import { ApiService } from '../sevrices/api.service';

@Component({
  selector: 'app-kullancisoru',
  templateUrl: './kullancisoru.component.html',
  styleUrls: ['./kullancisoru.component.css']
})
export class KullancisoruComponent implements OnInit {

  dialogBaslik:string = "";
  islem :any;
    frm!: FormGroup<any>;
    yeniKayit: User[];
    constructor(
      public apiServis : ApiService,
      public matDialog : MatDialog,
      public frmBuild :   FormBuilder,
      public dialogRef : MatDialogRef<KullancisoruComponent>,
      @Inject(MAT_DIALOG_DATA) public data : any
    ) { 
  
      this.islem = data.islem;
      this.yeniKayit= data.kayit; 
    if(this.islem== 'ekle'){
      this.dialogBaslik='Kullancı Ekle'
    } 
    if(this.islem== 'duzenle'){
      this.dialogBaslik='Kullancı Duzenle';
    }
    this.frm = this.FormOlstur();
  
  }
  
    ngOnInit() {
    }
    FormOlstur(){
     return this.frmBuild.group({
      UserName: [this.yeniKayit[0]?.UserName],
      NameSurname: [this.yeniKayit[0]?.NameSurname],
      Mail: [this.yeniKayit[0]?.Mail],
      Tel: [this.yeniKayit[0]?.Tel],
      Password: [this.yeniKayit[0]?.Password],
     
  
     })
    }
  
  }
  