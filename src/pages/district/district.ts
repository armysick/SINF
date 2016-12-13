/**
 * Created by user on 30-11-2016.
 */

import { NavController, Modal } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {Component} from "@angular/core";
import {GlobalService} from "../../app/GlobalService";
import {Events} from 'ionic-angular';
import {OpVendaByDistritoService} from "./OpVendaByDistritoService";
import { ModalController } from 'ionic-angular';
import { ModalPage } from '../modal-page/modal';

@Component({
  selector: 'page-district',
  templateUrl: 'district.html',
  providers: [OpVendaByDistritoService]
})


export class DistrictPage {

  currentDistrict: number;
  OVList: any;
  DNameList: any;
  distrito: string;

  constructor(public navCtrl: NavController, private myService: GlobalService, private ovdService: OpVendaByDistritoService, private events: Events, private modalCtrl: ModalController){
    this.currentDistrict = 12;
    if(myService.iddistrito == this.currentDistrict){
      this.search();
    }



    this.events.subscribe('testDistrictChange',() => {
      if(myService.iddistrito != this.currentDistrict){
        this.currentDistrict = myService.iddistrito;
        this.search();
      }
    });

  }


  openModal(characterNum) {

    let modal = this.modalCtrl.create(ModalPage, characterNum);
    modal.present();

  }

  search(){
    this.ovdService.searchOpVenda(this.myService.vendedor_id, this.currentDistrict).subscribe(
      data => {
        this.OVList = data;
      },
      err => {
        console.log(err);
      },
      () => console.log('OpVenda Search Complete')
    );

    this.ovdService.searchDistName(this.currentDistrict).subscribe(
      data2 => {
        this.DNameList = data2;
        for(let DName of this.DNameList)
          this.distrito = DName.Descricao;
      },
      err => {
        console.log(err);
      },
      () => console.log('DistName Search Complete')
    );
  }


}
