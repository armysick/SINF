/**
 * Created by user on 30-11-2016.
 */

import { NavController } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Component} from "@angular/core";
import {ExisteVendedorService} from './ExisteVendedorService';
import {HomePage} from "../home/home";
import {GlobalService} from "../../app/GlobalService";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ExisteVendedorService]
})


export class LoginPage {

  exists: any;
  //vendedor_id: any;
  myValue: boolean;

  constructor(public navCtrl: NavController, private ovService: ExisteVendedorService, private myService: GlobalService){

    this.myValue= false;
    //this.vendedor_id = 1;

  }

  search() {
    this.ovService.checkExisteVendedor(this.myService.vendedor_id).subscribe(
      data => {
        this.exists = data;
        console.log("Exists : " + this.exists);
        this.navCtrl.setRoot(HomePage);
      },
      err => {
        console.log(err);
        this.myValue = true;
      },
      () => console.log('OpVenda Search Complete')
    );

  }
}

