import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Car } from '../models/Car';
import { Foto } from '../models/Foto';
import { ApiService } from '../sevrices/api.service';

@Component({
  selector: 'app-foto',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.css']
})
export class FotoComponent implements OnInit {
  secilenFoto: any;
arabafoto : Foto= new Foto();
secAraba : Car ;
  constructor(
    public  fotoDialogRef : MatDialogRef<FotoComponent>,
    @Inject(MAT_DIALOG_DATA) public  data : any,
    public apiServis : ApiService
  ) { 
    this.secAraba= this.data;
  }

  ngOnInit() {
   
  }
  FotoSec(e : any){
    const defaultValue = ""; // varsayılan değeriniz burada tanımlanmalı

    var fotolar = e.target.files;
    var foto = fotolar[0];

    var fr = new FileReader();
    fr.onloadend= (event)=>{
      const fileReader = event.target as FileReader;
      const result = fileReader.result ?? defaultValue;
    this.secilenFoto= result;
    this.arabafoto.PhotoData= result.toString();
    this.arabafoto.PhotoUzanti= foto.type;
    console.log(e)
    };
  fr.readAsDataURL(foto);
}
}
