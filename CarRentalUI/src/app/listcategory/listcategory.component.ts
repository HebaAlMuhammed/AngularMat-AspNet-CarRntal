import { Component, OnInit } from '@angular/core';
import { ApiService } from '../sevrices/api.service';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../models/Car';

@Component({
  selector: 'app-listcategory',
  templateUrl: './listcategory.component.html',
  styleUrls: ['./listcategory.component.css']
})
export class ListcategoryComponent implements OnInit {
katId : number = 0
arabalar : Car[] =[];
  constructor(
    public apiServis : ApiService,
    public route : ActivatedRoute
  ) { }

  ngOnInit() {
   
    this.route.params.subscribe(p =>{
      if (p['katId']){
        this.katId = p['katId'];
        this.ArabaByKatId();
      }

    })

  }
  ArabaByKatId() {
    this.apiServis.ArabaById(this.katId).subscribe((d: Car[]) => {
      this.arabalar = d;
    });
  }
}
