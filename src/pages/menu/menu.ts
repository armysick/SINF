import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {GlobalService} from "../../app/GlobalService";
import {OpVendaService} from "./OpVendaService";
import {Events} from 'ionic-angular';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
  providers: [OpVendaService]
})
export class MenuPage {

  OVList: any;
  myValue: boolean;
  myDistList: boolean;
  constructor(public navCtrl: NavController, private myService: GlobalService, private ovService: OpVendaService, private events: Events) {
    this.myValue=false;
    this.myDistList = false;

  }


  search0(){
    this.myDistList = !this.myDistList;
  }
  search() {
    console.log(this.myService.vendedor_id);
    if(!this.myValue){
      this.ovService.searchOpVenda(this.myService.vendedor_id).subscribe(
        data => {
          this.OVList = data;
          console.log(this.OVList);
          this.myValue = true;
        },
        err => {
          console.log(err);
        },
        () => console.log('OpVenda Search Complete')
      );
    }
    else
      this.myValue = false;

  }

  search1(){
    this.myService.iddistrito = 1;
  }
  search2(){
    this.myService.iddistrito = 2;
  }
  search3(){
    this.myService.iddistrito = 3;
  }
  search4(){
    this.myService.iddistrito = 4;
  }
  search5(){
    this.myService.iddistrito = 5;
  }
  search6(){
    this.myService.iddistrito = 6;
  }
  search7(){
    this.myService.iddistrito = 7;
  }
  search8(){
    this.myService.iddistrito = 8;
  }
  search9(){
    this.myService.iddistrito = 9;
  }
  search10(){
    this.myService.iddistrito = 10;
  }
  search11(){
    this.myService.iddistrito = 11;
  }
  search12(){
    this.myService.iddistrito = 12;
  }
  search13(){
    this.myService.iddistrito = 13;
  }
  search14(){
    this.myService.iddistrito = 14;
  }
  search15(){
    this.myService.iddistrito = 15;
  }
  search16(){
    this.myService.iddistrito = 16;
  }
  search17(){
    this.myService.iddistrito = 17;
  }
  search18(){
    this.myService.iddistrito = 18;
  }

}
