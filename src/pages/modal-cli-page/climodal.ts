/**
 * Created by user on 12-12-2016.
 */
import {Component} from '@angular/core';

import { Platform, NavParams, ViewController } from 'ionic-angular';
import {GlobalService} from "../../app/GlobalService";
import {InserirClienteService} from "./InserirClienteService";

@Component({
  templateUrl: 'climodal.html',
  providers: [InserirClienteService]

})
export class ModalCliPage {
    codigo: any;
    nome: any;
    morada: any;
    distrito: any;
    contribuinte: any;
  constructor(
    public platform: Platform,
    public params: NavParams,
    public navCtrl: ViewController,
    private cliService : InserirClienteService,

  ) {

  }

  registarNovoCliente(){
    var dt = new Date().toLocaleDateString();
    console.log("A DATA É: " + dt);

        var body = {
          "NomeCliente": this.nome,
          "CodCliente": this.codigo, //TODO checkar este codigo
          "Morada": this.morada,
          "NumContribuinte": this.contribuinte,
          "Moeda": "EUR",
          "Distrito": this.distrito,
          "TotDeb": "0"
        }

        this.cliService.insertCliente(body).subscribe(
          data3 => {
            var resposta = data3;
          },
          err3 => {
            console.log(err3);
          },
          () => console.log('Insert COMPLETE')
        );
}


  dismiss() {
    this.navCtrl.dismiss();
  }
}
