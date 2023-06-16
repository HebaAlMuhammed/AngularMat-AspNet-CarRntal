import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Car } from '../models/Car';
import { Category } from '../models/Category';
import { ApiService } from '../sevrices/api.service';

@Component({
  selector: 'app-CarSoru',
  templateUrl: './CarSoru.component.html',
  styleUrls: ['./CarSoru.component.css']
})
export class CarSoruComponent implements OnInit {
  Ranted: boolean= false;
  kategoriler : Category[] = [];
  dialogBaslik: string = "";
  yeniKayit: Car[] ;
  islem: string;
  frm : FormGroup;
  
 
  constructor(
    public apiServis : ApiService,
    public  dialogRef: MatDialogRef<CarSoruComponent> ,
    public frmBuild : FormBuilder,
    @Inject (MAT_DIALOG_DATA) public data : any
  ) 
  { 
    this.islem= data.islem;
    this.yeniKayit= data.kayit; 
    if(this.islem== "ekle"){
      this.dialogBaslik= "Araba Ekle"
    }
    if(this.islem== "sil"){
      this.dialogBaslik= "Araba Sil"
    }
    if(this.islem== "düzenle"){
      this.dialogBaslik= "Araba Düzenle "
    }
    if(this.islem== "detay"){
      this.dialogBaslik= "Araba Detaylari "
    }
    this.frm = this.FormOlstur();
  }

  ngOnInit() {
  this.KategoriListe();
  }
  FormOlstur(){
    
    
    return this.frmBuild.group({
      CarNo: [this.yeniKayit[0]?.CarNo],
      Brand: [this.yeniKayit[0]?.Brand],
      Model: [this.yeniKayit[0]?.Model],
      Cost: [this.yeniKayit[0]?.Cost],
      UserId: [this.yeniKayit[0]?.UserId],
      Photo: [this.yeniKayit[0]?.Photo],
      Ranted: [this.yeniKayit[0]?.Ranted],
    
      CategoryId: [this.yeniKayit[0]?.CategoryId],
       
 
    });
   }
   KategoriListe(){
    this.apiServis.KategoriListe().subscribe((d:object)=>{
     this.kategoriler= d as Category[];
   
      
    });

}
}
