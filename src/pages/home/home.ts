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
  Rati2: number;
  Rat1: any;
  Rat2: any;
  myValue1: boolean;
  myValue2: boolean;
  constructor(public navCtrl: NavController, private myService: GlobalService, private homeService: HomeService){
    this.Dis1 = null;
    this.myValue1 = false;
    this.myValue2 = false;
    this.homeService.suggestedDistrict(this.myService.vendedor_id).subscribe(
      data3 => {
        for(var i in data3){
          if(this.Dis1 == null) {
            this.Dis1 = data3[i].Descricao;
            this.Rati1 = data3[i].Rating * 5;
            this.Rat1 = new Number(this.Rati1);
            this.Rat1 = this.Rat1.toPrecision(2);
            this.myValue1 = true;
          }
          else {
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
  }


}
