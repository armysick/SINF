/**
 * Created by user on 30-11-2016.
 */

import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {Component} from "@angular/core";
import {GlobalService} from "../../app/GlobalService";
import {Events} from 'ionic-angular';
import {OpVendaByDistritoService} from "./OpVendaByDistritoService";

@Component({
  selector: 'page-district',
  templateUrl: 'district.html',
  providers: [OpVendaByDistritoService]
})


export class DistrictPage {

  currentDistrict: number;
  OVList: any;
  DNameList: any;
  constructor(public navCtrl: NavController, private myService: GlobalService, private ovdService: OpVendaByDistritoService, private events: Events){
    this.currentDistrict = 13;
    this.search();

    this.events.subscribe('testDistrictChange',() => {
      if(myService.iddistrito != this.currentDistrict){
        this.currentDistrict = myService.iddistrito;
        this.search();
      }
    });

  }

  search(){
    console.log(this.currentDistrict);
    this.ovdService.searchOpVenda(this.myService.vendedor_id, this.currentDistrict).subscribe(
      data => {
        this.OVList = data;
        console.log("this OVList: " + this.OVList);
      },
      err => {
        console.log(err);
      },
      () => console.log('OpVenda Search Complete')
    );

    this.ovdService.searchDistName(this.currentDistrict).subscribe(
      data2 => {
        this.DNameList = data2;
        console.log("data; -> " + data2.Descricao);
        console.log("DNAMELIST: " + this.DNameList);
      },
      err => {
        console.log(err);
      },
      () => console.log('DistName Search Complete')
    );
  }


}
