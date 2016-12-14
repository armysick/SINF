import { Component } from '@angular/core';

import { Platform, NavParams, ViewController } from 'ionic-angular';
import {getClienteService} from "./getClienteService";
import {GlobalService} from "../../app/GlobalService";




@Component({
  templateUrl: 'modal.html',
  providers: [getClienteService]
})
export class ModalPage {
  Cliente;
  OPV;
  Status;
  Articles;
  selectedarticle;
  selectedarticleid;
  selectedarticleprice;
  textboxvalue: boolean;
  selectedstatus;
  testdata;
  constructor(
    public platform: Platform,
    public params: NavParams,
    public navCtrl: ViewController,
    private getCliSer: getClienteService,
    private myService: GlobalService
  ) {
    this.textboxvalue = false;
    this.selectedarticle = null;
    this.OPV = this.params.get('any');


    this.Cliente =
      {
        NomeCliente: "", //data2.NomeCliente,
        Morada: "",
        TotDeb: ""
      };

    this.Status=[
      {
        name: 'Falhado',
        BP: 0
      },
      {
        name: 'Visitado',
        BP: 30
      },
      {
        name: 'Lead',
        BP: 25
      },
      {
        name: 'Prospect',
        BP: 80
      }
    ];
    console.log("entidade: " + this.OPV.Entidade);
    console.log("OPV: " + this.OPV.ID);
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
        var body2 =
          {
            "Descricao": this.OPV.Descricao,
            "Entidade": this.OPV.Entidade,
            "Vendedor": this.myService.vendedor_id,
            "BarraPercentual": 100,
            "Oportunidade": this.OPV.Oportunidade,
            "Resumo" : this.OPV.Resumo
          }
        this.getCliSer.updateOPV(body2, this.OPV.Oportunidade).subscribe(
          data4 => {
            var resposta = data4;
            this.dismiss();
          },
          err4 => {
            console.log(err4);
          },
          () => console.log('Update OPV COMPLETE')
        );
        this.dismiss();
      },
      err4 => {
        console.log(err4);
      },
      () => console.log('Insert Sales Order COMPLETE')
    );


  }


  terminarVenda(){
    if(!this.textboxvalue){
      this.textboxvalue = true;
    }
    else{
      var barrapercentual = 25;
      for(var i in this.Status){
        if(this.Status[i].name == this.selectedstatus){
          barrapercentual = this.Status[i].BP;
        }
      }

      var body =
        {
          "Descricao": this.OPV.Descricao,
          "Entidade": this.OPV.Entidade,
          "Vendedor": this.myService.vendedor_id,
          "BarraPercentual": barrapercentual,
          "Oportunidade": this.OPV.Oportunidade,
          "Resumo": this.OPV.Resumo
        }

        console.log("this.OPV.MArcacaco " + this.OPV.Resumo);
      console.log("opv oprtunidade: "+ this.OPV.Oportunidade);
      this.getCliSer.updateOPV(body, this.OPV.Oportunidade).subscribe(
        data4 => {
          var resposta = data4;
          console.log(data4);
          this.dismiss();
        },
        err4 => {
          console.log(err4);
        },
        () => console.log('Update OPV COMPLETE')
      );
    }
  }

  dismiss() {
    this.navCtrl.dismiss();
  }
}
