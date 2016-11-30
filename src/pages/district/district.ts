/**
 * Created by user on 30-11-2016.
 */

import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {Component} from "@angular/core";
import {GlobalService} from "../../app/GlobalService";
import {Events} from 'ionic-angular';

@Component({
  selector: 'page-district',
  templateUrl: 'district.html'
  //providers: [OpVendaService]
})


export class DistrictPage {

  currentDistrict: number;
  constructor(public navCtrl: NavController, private myService: GlobalService, private events: Events){
    this.currentDistrict = 1;
    this.events.subscribe('testDistrictChange',() => {
      if(myService.iddistrito != this.currentDistrict){
        this.currentDistrict = myService.iddistrito;
        // TODO search(/*this.currentDistrict*/)
      }
    });

  }

  search(){

  }


}
