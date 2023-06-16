import { Injectable } from '@angular/core';
import { Car } from '../models/Car';
import { Category } from '../models/Category';
import { Sonuc } from '../models/Sonuc';
import { User } from '../models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Foto } from '../models/Foto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "http://localhost:4713/api/";
  siteUrl = "http://localhost:4713/";
  constructor(
    public http: HttpClient 
  ) { }

  /*   Oturum İşlemleri Başla  */
  tokenAl(kadi: string, parola: string) {
    var data = "username=" + kadi + "&password=" + parola + "&grant_type=password";
    var reqHeader = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
    return this.http.post(this.apiUrl + "/token", data, { headers: reqHeader });
  }
  oturumKontrol() {
    if (localStorage.getItem("token")) {
      return true;
    }
    else {
      return false;
    }
  }

  yetkiKontrol(yetkiler: any[]) {
    var sonuc: boolean = false;
    var uyeYetkiler: string[] = [];

    var uyeYetkiler: string[] = JSON.parse(localStorage.getItem("uyeYetkileri")|| "[]");

    if (uyeYetkiler) {
      yetkiler.forEach(element => {
        if (uyeYetkiler.indexOf(element) > -1) {
          sonuc = true;
        }
      });
    }

    return sonuc;
  }
  

  /*   Oturum İşlemleri Bitiş  */


  /*  API  */

  KategoriListe() {
    return this.http.get(this.apiUrl + "/kategoriliste");
  }
  KategoriById(katId: number) {
    return this.http.get(this.apiUrl + "/kategoribyid/" + katId);
  }
  KategoriEkle(kat: Category) {
    return this.http.post<Sonuc>(this.apiUrl + "/kategoriekle", kat);
  }
  KategoriDuzenle(kat: Category) {
    return this.http.put<Sonuc>(this.apiUrl + "/kategoriduzenle", kat);
  }
  KategoriSil(katId: number) {
    return this.http.delete<Sonuc>(this.apiUrl + "/kategorisil/" + katId);
  }

  ArabaListe() {
    return this.http.get(this.apiUrl + "/arabaliste");
  }
  BugunTeslimOlanArabalar(s: number) {
    return this.http.get(this.apiUrl + "/bugunteslimolanarabalar/" + s);
  }
  ArabaListeByKatId(katId: number) {
    return this.http.get(this.apiUrl + "/arabalistebykatid/" + katId);
  }
  ArabaListeByUyeId(uyeId: number) {
    return this.http.get(this.apiUrl + "/arabalistebyuyeid/" + uyeId);
  }
  ArabaById(katId: number): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl + "/arabalar/" + katId);
  }
  ArabaEkle(araba: Car) {
    return this.http.post<Sonuc>(this.apiUrl + "/arabaekle", araba);
  }
  ArabaDuzenle(araba: Car) {
    return this.http.put<Sonuc>(this.apiUrl + "/arabaduzenle", araba);
  }
  ArabaSil(arabaId: number) {
    return this.http.delete<Sonuc>(this.apiUrl + "/arabasil/" + arabaId);
  }
  ArabaFotoGuncelle(foto: Foto) {
    return this.http.post<Sonuc>(this.apiUrl + "/arabphotoguncelle", foto);
  }

  UserListe() {
    return this.http.get(this.apiUrl + "/userliste");
  }
  UserById(uyeId: number) {
    return this.http.get(this.apiUrl + "/userbyid/" + uyeId);
  }
  UserEkle(uye: User) {
    return this.http.post<Sonuc>(this.apiUrl + "/userekle", uye);
  }
  UserDuzenle(uye: User) {
    return this.http.put(this.apiUrl + "/userduzenle", uye);
  }
  UserSil(uyeId: number) {
    return this.http.delete(this.apiUrl + "/usersil/" + uyeId);
  }

}
