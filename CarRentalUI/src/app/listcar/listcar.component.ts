import { Component, OnInit } from '@angular/core';
import { ApiService } from '../sevrices/api.service';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../models/Car';

@Component({
  selector: 'app-listcar',
  templateUrl: './listcar.component.html',
  styleUrls: ['./listcar.component.css']
})
export class ListcarComponent implements OnInit {
caraId !: number;
arabalar: Car[] = [];
  car!: Car[];
  constructor(
    public apiServis : ApiService,
    public route : ActivatedRoute
  ) { }

  ngOnInit() {
    
    this.route.params.subscribe(p =>{
      if (p['caraId']){
        this.caraId = p['caraId'];
        this.ArabaById();
      }

    })

 
}


ArabaById() {
  this.apiServis.ArabaById(this.caraId).subscribe((d: Car[]) => {
    this.arabalar = d;
  });
}
}
