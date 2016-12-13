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
    myValue: boolean;
  constructor(
    public platform: Platform,
    public params: NavParams,
    public navCtrl: ViewController,
    private cliService : InserirClienteService,
  ) {
    this.myValue = false;
  }

  registarNovoCliente(){
    var dt = new Date().toLocaleDateString();
    console.log("A DATA É: " + dt);

        var body = {
          "Morada": this.morada,
          "CodCliente": this.codigo,
          "NomeCliente": this.nome,
          "NumContribuinte": this.contribuinte,
          "Moeda": "EUR",
          "Distrito": this.distrito,
          "TotDeb": "0"
        }

        this.cliService.insertCliente(body).subscribe(
          data3 => {
            var resposta = data3;
            this.dismiss();
          },
          err3 => {
            console.log(err3._body  );
            if(err3._body = "O cliente já existe")
              this.myValue = true;
          },
          () => console.log('Insert COMPLETE')
        );
}


  dismiss() {
    this.navCtrl.dismiss();
  }
}
