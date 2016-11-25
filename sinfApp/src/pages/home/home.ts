import { Component } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  vendedor_id:string;
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
    this.http.get("http://localhost:49822/api/Clientes",opt).subscribe (data => {
      console.log("Got Data");
      this.posts = JSON.parse(data);

 //http://stackoverflow.com/questions/37841949/add-header-to-the-api-http-request-angular-2-ionic-2   });

    console.log(data);
  })
  }
  search(){

  }

}
