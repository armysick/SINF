import { NavController } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Component} from "@angular/core";
import {OpVendaService} from './OpVendaService';
import {GlobalService} from "../../app/GlobalService";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [OpVendaService]
})


export class HomePage {

  OVList: any;
  vendedor_id: any;

  constructor(public navCtrl: NavController, private ovService: OpVendaService, private myService: GlobalService){

    //this.vendedor_id = 1;
    console.log("vendedor aqui: " + myService.vendedor_id);

  }

  search() {
    console.log(this.vendedor_id);
      this.ovService.searchOpVenda(this.myService.vendedor_id).subscribe(
        data => {
          this.OVList = data;
          console.log(this.OVList);
        },
        err => {
          console.log(err);
        },
        () => console.log('OpVenda Search Complete')
      );

}
}
