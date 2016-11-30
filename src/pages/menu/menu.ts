import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {GlobalService} from "../../app/GlobalService";
import {OpVendaService} from "./OpVendaService";

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
  providers: [OpVendaService]
})
export class MenuPage {

  OVList: any;
  myValue: boolean;
  constructor(public navCtrl: NavController, private myService: GlobalService, private ovService: OpVendaService) {
    this.myValue=false;

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
}
