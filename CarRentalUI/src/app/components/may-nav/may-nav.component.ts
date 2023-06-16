import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, shareReplay } from 'rxjs';
import { ApiService } from 'src/app/sevrices/api.service';
import { Category } from 'src/app/models/Category';
import { Car } from 'src/app/models/Car';

@Component({
  selector: 'app-may-nav',
  templateUrl: './may-nav.component.html',
  styleUrls: ['./may-nav.component.css']
})
export class MayNavComponent implements OnInit {
  kategoriler:Category[] = [];
  arabalar: Car [] = [];
  kadi : string ="";
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public apiServis : ApiService
    ) {}
  ngOnInit(): void {
    this.KategoriListele();
    this.ArbaListele();
  if (this.apiServis.oturumKontrol()){
    const kadi = localStorage.getItem("kadi");
    if (kadi !== null) {
      this.kadi = kadi;
  
  }}
}
  OturumKapat(){
    localStorage.clear();
    location.href="/";  }

KategoriListele(){
  this.apiServis.KategoriListe().subscribe((d : object)=>{
    this.kategoriler = d as Category[];
  })
}
ArbaListele(){
  this.apiServis.KategoriListe().subscribe((d : object)=>{
    this.arabalar = d as Car[];
  })
}
  
  }

