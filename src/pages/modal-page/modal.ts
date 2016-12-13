import { Component } from '@angular/core';

import { Platform, NavParams, ViewController } from 'ionic-angular';
import {getClienteService} from "./getClienteService";




@Component({
  templateUrl: 'modal.html',
  providers: [getClienteService]
})
export class ModalPage {
  Cliente;
  OPV;
  constructor(
    public platform: Platform,
    public params: NavParams,
    public navCtrl: ViewController,
    private getCliSer: getClienteService
  ) {
    this.OPV = this.params.get('any');


    this.Cliente =
      {
        NomeCliente: "", //data2.NomeCliente,
        Morada: "",
        TotDeb: ""
      };
    console.log("entidade: " + this.OPV.Entidade);
    console.log("OPV: " + this.OPV.ID)
    this.getCliSer.getCliente(this.OPV.Entidade).subscribe(
      data2 => {
        // SUCCESS ON SEARCH 2
        this.Cliente =
          {
            NomeCliente: data2.NomeCliente,
            Morada: data2.Morada,
            TotDeb: data2.TotDeb
          };
      },
      err2 => {
        console.log(err2);
      },
      () => console.log('getCli da OPV Search Complete')
    );




  }

  dismiss() {
    this.navCtrl.dismiss();
  }
}
