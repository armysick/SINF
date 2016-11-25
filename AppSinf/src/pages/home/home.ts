/*import { Component } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  vendedor_id:string;
  data:any;
  posts: any;
  constructor(public navCtrl: NavController, public http: Http) {
    let opt: RequestOptions
    let myHeaders: Headers = new Headers
    myHeaders.set('Content-type', 'application/json');
    myHeaders.append('User', 'user');
    myHeaders.append('Password', 'Feup2016')

    opt = new RequestOptions({
      headers: myHeaders
    })

    this.http.get('http://localhost:49822/api/Clientes',opt)
      .map(res => res.json())
      .subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.posts = data;
        console.log(data);
      });
  }
  search(){

  }

}*/
import { NavController } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Component} from "@angular/core";
import {ClientService} from './ClientService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ClientService]
})


export class HomePage {

  ClientList: any;

  constructor(public navCtrl: NavController, private clientService: ClientService){


  }

  search() {
      this.clientService.searchClients().subscribe(
        data => {
          this.ClientList = data;
          console.log(this.ClientList);
        },
        err => {
          console.log(err);
        },
        () => console.log('Movie Search Complete')
      );

}
}
