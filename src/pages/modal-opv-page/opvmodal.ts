/**
 * Created by user on 03-12-2016.
 */
import {Component} from '@angular/core';

import { Platform, NavParams, ViewController } from 'ionic-angular';
import {GlobalService} from "../../app/GlobalService";
import {GetClientesService} from "./GetClientesService";

@Component({
  templateUrl: 'opvmodal.html',
  providers: [GetClientesService]
})
export class ModalOPVPage {

  clis;
  selectedcodcli;
  descri: any;
  infoselectedcli;
  constructor(
    public platform: Platform,
    public params: NavParams,
    public navCtrl: ViewController,
    public myService: GlobalService,
    private cliService: GetClientesService
  ) {
    this.loadClientes();
  }


  loadClientes(){
    this.cliService.searchClientes().subscribe(
      data => {
        this.clis = data;
        console.log("this Clis: " + this.clis);
      },
      err => {
        console.log(err);
      },
      () => console.log('Clientes[list] Search Complete')
    );
  }

  registarNovaVenda(){
    var dt = new Date().toLocaleDateString();
    console.log("A DATA É: " + dt);

      this.cliService.searchCliEspecifico(this.selectedcodcli).subscribe(
        data2 => {
          this.infoselectedcli = data2;
          var body = {
            "Entidade": this.infoselectedcli.CodCliente,
            "Vendedor": this.myService.vendedor_id,
            "BarraPercentual": 25,
            "Descricao": this.descri,
            "Moeda": "EUR",
            "CicloVenda": "CV_DEF",
            "TipoEntidade": "C",
            "DataCriacao": dt,
            "DataExpiracao": "2016-12-15T21:55:44.5807972+00:00",
            "Oportunidade": "OPV006",
            "Distrito": this.infoselectedcli.Distrito

          }

          this.cliService.insertOpVenda(body).subscribe(
            data3 => {
              var resposta = data3;
              this.dismiss();
            },
            err3 => {
              console.log(err3);
            },
            () => console.log('Insert COMPLETE')
          );

        },
        err => {
          console.log(err);
        },
        () => console.log('DistName Search Complete')
      );
  }
  dismiss() {
    console.log(this.selectedcodcli);
    console.log ("Descri: " + this.descri);
    this.navCtrl.dismiss();
  }
}
