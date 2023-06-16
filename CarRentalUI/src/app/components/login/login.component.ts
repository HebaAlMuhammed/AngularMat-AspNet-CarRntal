import { Component, OnInit } from '@angular/core';
import { Sonuc } from 'src/app/models/Sonuc';
import { AlertService } from 'src/app/sevrices/alert.service';
import { ApiService } from 'src/app/sevrices/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public apiServis : ApiService,
    public alert : AlertService

    ) { }

  ngOnInit() {
  }
  OturumAc(kadi: string, parola: string){
    
    this.apiServis.tokenAl(kadi, parola).subscribe((d: any) => {
      localStorage.setItem("token", d.access_token);
      localStorage.setItem("uid", d.uyeId);
      localStorage.setItem("kadi", d.uyeKadi);
      localStorage.setItem("uyeYetkileri", d.uyeYetkileri);
      location.href= "/";
      
    }, err => {
      var s : Sonuc = new Sonuc();
     
      s.islem = false;
      s.mesaj= "kullancı Adı veya Şifre Hatalı"
      this.alert.AlertUygula(s);
    }
    );
     }

}

