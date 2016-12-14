/**
 * Created by user on 12-12-2016.
 */
import {Component} from '@angular/core';
import { AlertController } from 'ionic-angular';

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
    selecteddist;
    districts;
  constructor(
    public platform: Platform,
    public params: NavParams,
    public navCtrl: ViewController,
    private cliService : InserirClienteService,
    public alertCtrl: AlertController
  ) {
    this.myValue = false;

    this.districts = [
      {
        id: '1',
        nome: 'Aveiro'
      },
      {
        id: '2',
        nome: 'Beja'
      },
      {
        id: '3',
        nome: 'Braga'
      },
      {
        id: '4',
        nome: 'Bragança'
      },
      {
        id: '5',
        nome: 'Castelo Branco'
      },
      {
        id: '6',
        nome: 'Coimbra'
      },
      {
        id: '7',
        nome: 'Évora'
      },
      {
        id: '8',
        nome: 'Faro'
      },
      {
        id: '9',
        nome: 'Guarda'
      },
      {
        id: '10',
        nome: 'Leiria'
      },
      {
        id: '11',
        nome: 'Lisboa'
      },
      {
        id: '12',
        nome: 'Portalegre'
      },
      {
        id: '13',
        nome: 'Porto'
      },
      {
        id: '14',
        nome: 'Santarém'
      },
      {
        id: '15',
        nome: 'Setúbal'
      },
      {
        id: '16',
        nome: 'Viana do Castelo'
      },
      {
        id: '17',
        nome: 'Vila Real'
      },
      {
        id: '18',
        nome: 'Viseu'
      }
    ];
  }

  registarNovoCliente(){
    var dt = new Date().toLocaleDateString();
    console.log("A DATA É: " + dt);

    for(var i in this.districts){
      if(this.districts[i].nome == this.selecteddist ){
          this.distrito = this.districts[i].id;
          break;
      }
    }
    if(this.distrito < 10){
      this.distrito = "0" + this.distrito;
    }
      console.log("distrito: " + this.distrito);

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
              this.showAlert();
          },
          () => console.log('Insert COMPLETE')
        );
}


  dismiss() {
    this.navCtrl.dismiss();
  }

  showAlert() {
  let alert = this.alertCtrl.create({
    title: 'Utilizador existente!',
    subTitle: 'O código de utilizador inserido já existe!',
    buttons: ['OK']
  });
  alert.present();
}
}
