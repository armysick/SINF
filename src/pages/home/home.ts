import { NavController } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Component} from "@angular/core";
import {GlobalService} from "../../app/GlobalService";
import {HomeService} from "./HomeService";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HomeService]
})


export class HomePage {


  Dis1: any;
  Dis2: any;
  Rati1: any;
  Rati2: any;
  Rat1: any;
  Rat2: any;
  did1: number;
  did2: number;
  myValue1: boolean;
  myValue2: boolean;
  ResumoOVList;
  constructor(public navCtrl: NavController, private myService: GlobalService, private homeService: HomeService){
    this.Dis1 = null;
    this.myValue1 = false;
    this.myValue2 = false;
    this.homeService.suggestedDistrict(this.myService.vendedor_id).subscribe(
      data3 => {
        for(var i in data3){
          if(this.Dis1 == null) {
            this.did1 = data3[i].ID;
            this.Dis1 = data3[i].Descricao;
            this.Rati1 = data3[i].Rating * 5;
            this.Rat1 = new Number(this.Rati1);
            this.Rat1 = this.Rat1.toPrecision(2);
            this.myValue1 = true;
          }
          else {
            this.did2 = data3[i].ID;
            this.Dis2 = data3[i].Descricao;
            this.Rati2 = data3[i].Rating * 5;
            this.Rat2 = new Number(this.Rati2);
            this.Rat2 = this.Rat2.toPrecision(2);
            this.myValue2 = true;
          }
        }
      },
      err3 => {
        console.log(err3);
      },
      () => console.log('Suggest COMPLETE')
    );




    this.homeService.getResumos(this.myService.vendedor_id).subscribe(
      data4 => {
        this.ResumoOVList = data4;
      },
      err4 => {
        console.log(err4);
      },
      () => console.log('Get Resumos COMPLETE')
    );
  }

  selectDist1() {
    this.myService.iddistrito = this.did1;
  }
  selectDist2(){
      this.myService.iddistrito = this.did2;
  }


}
