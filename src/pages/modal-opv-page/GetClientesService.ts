/**
 * Created by user on 03-12-2016.
 */
/**
 * Created by user on 30-11-2016.
 */
/**
 * Created by user on 25-11-2016.
 */

import {Http,RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

export class GetClientesService {
  static get parameters() {
    return [[Http]];
  }

  constructor(private http:Http) {

  }

  searchClientes() {
    let opt: RequestOptions
    let myHeaders: Headers = new Headers;
    myHeaders.set('Access-Control-Allow-Origin', '*');
    myHeaders.append('Content-type', 'application/json');
    myHeaders.append('User', 'user');
    myHeaders.append('Password', 'Feup2016')


    opt = new RequestOptions({
      headers: myHeaders
    })
    var url = 'http://localhost:49822/api/Clientes';
    var response = this.http.get(url,opt).map(res => res.json());

    return response;
  }



  searchCliEspecifico(clid) {
    let opt: RequestOptions
    let myHeaders: Headers = new Headers;
    myHeaders.set('Access-Control-Allow-Origin', '*');
    myHeaders.append('Content-type', 'application/json');
    myHeaders.append('User', 'user');
    myHeaders.append('Password', 'Feup2016')

    opt = new RequestOptions({
      headers: myHeaders
    })
    var url = 'http://localhost:49822/api/Clientes/' + clid;
    var response = this.http.get(url, opt).map(res => res.json());
    return response;
  }


  insertOpVenda(body){
    let opt: RequestOptions
    let myHeaders: Headers = new Headers;
    myHeaders.set('Access-Control-Allow-Origin', '*');
    myHeaders.append('Content-type', 'application/json');
    myHeaders.append('User', 'user');
    myHeaders.append('Password', 'Feup2016')

    opt = new RequestOptions({
      headers: myHeaders
    })


    var url = 'http://localhost:49822/api/OpVendas';
    var response = this.http.post(url,body,opt).map(res => res.json());

    console.log("RESPONSE : " + response);
    return response;
  }

}
