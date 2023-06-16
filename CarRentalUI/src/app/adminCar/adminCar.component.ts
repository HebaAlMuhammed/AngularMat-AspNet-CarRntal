import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CarSoruComponent } from '../CarSoru/CarSoru.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { Car } from '../models/Car';
import { Category } from '../models/Category';
import { Sonuc } from '../models/Sonuc';
import { AlertService } from '../sevrices/alert.service';
import { ApiService } from '../sevrices/api.service';
import { FotoComponent } from '../foto/foto.component';

@Component({
  selector: 'app-adminCar',
  templateUrl: './adminCar.component.html',
  styleUrls: ['./adminCar.component.css']
})
export class AdminCarComponent implements OnInit {
  yeniKayit: Car | undefined;
  arabalar : Car[]= [];
  kategoriler: Category[]= [];
  dataSource: any;
  katId: number= 0;
  uyeId : number = 0;
  secKat!:Category;
  displayedColumns= ['CarNo','Brand','Model','Cost','Date','Ranted','Photo','Detay'];
 
  @ViewChild(MatSort) Sort!: MatSort;
  @ViewChild(MatPaginator) paginator! : MatPaginator;
  dialogRefConfim : MatDialogRef<ConfirmationComponent> | null = null;
  fotoDialogRef : MatDialogRef<FotoComponent> | null = null;
  //fotoDialogRef : MatDialogRef<FotoDialogComponent>;

  dialogRef !:MatDialogRef<CarSoruComponent>;
  constructor(
    public apiServis : ApiService,
    public matDialog : MatDialog,
    public alert : AlertService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    const uyeIdString = localStorage.getItem("uid");
    if (uyeIdString !== null) {
      this.uyeId = parseInt(uyeIdString);
    }

    this. KategoriListe();
    this.route.paramMap.subscribe(p => {
      this.KategoryById
      const katId = Number(p.get('katId'));
      if (!isNaN(katId)) {
        this.katId = katId;
      
      }
    });
    
  }
  KategoryById(){
   this.apiServis.KategoriById(this.katId).subscribe((d: object) =>{
    this.secKat = d as Category;
this.ArabaListe();
   }) 
  }
  ArabaListe(){
    this.apiServis.ArabaListeByKatId(this.katId).subscribe((d:object)=>{
     this.arabalar= d as Car[];
     this.dataSource = new MatTableDataSource(d as unknown[]);
     this.dataSource.Sort= this.Sort;
     this.dataSource.paginator= this.paginator;
      
    });
   }
   KategoriListe(){
    this.apiServis.KategoriListe().subscribe((d:object)=>{
     this.kategoriler= d as Category[];
   
      
    });

   }
 
      KategoriSec(kat: Category) {
        
        this.katId = kat.CategoryId;
        this.ArabaListe();
      }
      
 
  
   Ekle(){
    var yenikayit:Car= new Car();
    this.dialogRef= this.matDialog.open(CarSoruComponent,
      {
      width :"400px",
      data: {
        kayit: yenikayit,
        islem: 'ekle'}}
      
    );
     this.dialogRef.afterClosed().subscribe(d =>{
      if(d){
        yenikayit = d;
        yenikayit.Photo = "car.jpg";
        yenikayit.Ranted= true;
        yenikayit.Date = new  Date ();
        yenikayit.UserId=this.uyeId;
        yenikayit.Description = "kullanışlı şık ve güvenli "
        this.apiServis.ArabaEkle(yenikayit).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem) {
            this.ArabaListe();
          }
        })
      }
     console.log(d);
    
    });
  }
   
  Duzenle(kayit : Car){
    this.dialogRef= this.matDialog.open(CarSoruComponent,
      {
      width :"400px",
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
   
    });
    this.dialogRef.afterClosed().subscribe(d =>{
      if(d){
        kayit.CarNo= d.CarNo;
        this.apiServis.ArabaDuzenle(kayit).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem) {
            this.ArabaListe();
          }
        })
      }
      console.log(d); });
  }

  Detay(kayit : Car){
    
    this.dialogRef= this.matDialog.open(CarSoruComponent,
      {
        
      width :"400px",
      data: {
        kayit: kayit,
        islem: 'detay'
      }
   
    });
   
  }


  Sil(kayit : Car){
    this.dialogRefConfim= this.matDialog.open(ConfirmationComponent ,
      {
      width :"400px",
    });
    this.dialogRefConfim.componentInstance.dialogMesaj= kayit.CarNo +" numaralı arabasi silinecek onaylıyor musunuuz"
  this.dialogRefConfim.afterClosed().subscribe(d =>{
    if (d) {
      kayit.CarNo= d.CarNo;
      this.apiServis.ArabaSil(kayit.CarId).subscribe((s:Sonuc)=>{
        this.alert.AlertUygula(s);
        if(s.islem){
          this.ArabaListe
        }
      });
    }
  });
  }
 
  FotoGuncelle(car: Car) {
    var yeniKayit = new Car();
    this.fotoDialogRef = this.matDialog.open(FotoComponent, {
      width: "400px",
      data: car
    });

    this.fotoDialogRef.afterClosed().subscribe(d => {
      if (yeniKayit) {
        d.CarId = car.CarId;
        this.apiServis.ArabaFotoGuncelle(d).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.ArabaListe();
          }
        });
      }
    });
 }
}

