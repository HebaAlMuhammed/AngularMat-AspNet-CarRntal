import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { KullancisoruComponent } from '../kullancisoru/kullancisoru.component';
import { Sonuc } from '../models/Sonuc';
import { User } from '../models/User';
import { AlertService } from '../sevrices/alert.service';
import { ApiService } from '../sevrices/api.service';

@Component({
  selector: 'app-adminkullanci',
  templateUrl: './adminkullanci.component.html',
  styleUrls: ['./adminkullanci.component.css']
})
export class AdminkullanciComponent implements OnInit {

  users: User[] = [];
  displayedColumns=['UserName','NameSurname', 'Tel','Password','Mail','Islemler'];
  dataSource  :any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dialogRef: MatDialogRef<KullancisoruComponent> |null = null;

  constructor(
    public apiService: ApiService,
    public matDialog: MatDialog,
    public alert : AlertService
  ) { }

  ngOnInit() {
  this.UserListele();
  
  }
  UserListele() {
    this.apiService.UserListe().subscribe((d: object) => {
      this.users = d as User[];
      console.log(d);
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  
Filterle(e: Event){
  var deger= (e.target as HTMLInputElement).value;
  this.dataSource.filter = deger.trim().toLowerCase();
  if (this.dataSource.paginator){
    this.dataSource.paginator.firstPage();
  }
}
Ekle(){
  var yenikayit:User= new User();
  this.dialogRef= this.matDialog.open(KullancisoruComponent,
    {
    width :"400px",
    data: {
      kayit: yenikayit,
      islem: 'ekle'
    }
  });
  this.dialogRef.afterClosed().subscribe(d =>{
    console.log(d);
    this.apiService.UserEkle(d).subscribe((s : Sonuc )=>{
      this.alert.AlertUygula(s);   
      if(s.islem){
        
        this.UserListele();
      } 
      })
  });
}

Duzenle(kayit:User){
  this.dialogRef= this.matDialog.open(KullancisoruComponent,
    {
    width :"400px",
    data: {
      kayit: kayit,
      islem: 'duzenle'
    }
  });
  this.dialogRef.afterClosed().subscribe(d =>{
    console.log(d);
   
  });
}

}