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
  Articles;
  selectedarticle;
  selectedarticleid;
  selectedarticleprice;
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


      // LOAD ARTICLEs
    this.getCliSer.getArtigos().subscribe(
      data3 => {
        // SUCCESS ON SEARCH
        this.Articles = data3;
      },
      err3 => {
        console.log(err3);
      },
      () => console.log('getArtigos Search Complete')
    );


  }

  SalesOrder(){
    for(var i in this.Articles){
      if(this.Articles[i].DescArtigo == this.selectedarticle ){
        this.selectedarticleid = this.Articles[i].CodArtigo;
        this.selectedarticleprice = this.Articles[i].Price;
        break;
      }
    }

    var body = {
      "Entidade": this.OPV.Entidade,
      "LinhasDoc": [
        {
          "CodArtigo": this.selectedarticleid,
          "Quantidade": 1,
          "PrecoUnitario": this.selectedarticleprice
        }
      ]
    }

    this.getCliSer.insertSalesOrder(body).subscribe(
      data4 => {
        var resposta = data4;
        this.dismiss();
      },
      err4 => {
        console.log(err4);
      },
      () => console.log('Insert Sales Order COMPLETE')
    );


  }
  dismiss() {
    this.navCtrl.dismiss();
  }
}
