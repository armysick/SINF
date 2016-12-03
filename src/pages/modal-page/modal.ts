import { Component } from '@angular/core';

import { Platform, NavParams, ViewController } from 'ionic-angular';




@Component({
  templateUrl: 'modal.html'
})
export class ModalPage {
  Cliente;
  OPV;
  constructor(
    public platform: Platform,
    public params: NavParams,
    public navCtrl: ViewController
  ) {
    this.OPV = this.params.get('any');

    //TODO Serviço de ir buscar um cliente.
    this.Cliente =
      {
        NomeCliente: "JZABRNSICK",
        Morada: "Rua Zé Colmeia, 420-69",
        TotDeb: "1337"
      };

  }

  dismiss() {
    this.navCtrl.dismiss();
  }
}
