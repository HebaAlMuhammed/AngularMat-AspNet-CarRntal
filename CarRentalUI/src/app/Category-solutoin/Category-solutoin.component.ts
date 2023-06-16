import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../models/Category';

@Component({
  selector: 'app-Category-solutoin',
  templateUrl: './Category-solutoin.component.html',
  styleUrls: ['./Category-solutoin.component.css']
})
export class CategorySolutoinComponent implements OnInit {
  dialogBaslik: string = "";
  yeniKayit: Category[];
  islem: string;
  frm : FormGroup;

  constructor(
    public  dialogRef: MatDialogRef<CategorySolutoinComponent> ,
    public frmBuild : FormBuilder,
    @Inject (MAT_DIALOG_DATA) public data : any
  ) 
  { 
    this.islem= data.islem;
    this.yeniKayit= data.kayit; 
    if(this.islem== "ekle"){
      this.dialogBaslik= "kategoi Ekle"
    }
    if(this.islem== "sil"){
      this.dialogBaslik= "kategoi Sil"
    }
    if(this.islem== "duzenle"){
      this.dialogBaslik= "kategoi Düzenle "
    }
    
    this.frm = this.FormOlstur();
  }

  ngOnInit() {
  
  }
  FormOlstur(){
    return this.frmBuild.group({
      CategoryName: [this.yeniKayit[0]?.CategoryName]

 
    })
   }

}

