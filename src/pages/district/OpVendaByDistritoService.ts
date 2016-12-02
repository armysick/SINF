/**
 * Created by user on 30-11-2016.
 */
/**
 * Created by user on 25-11-2016.
 */

import {Http,RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

export class OpVendaByDistritoService {
  static get parameters() {
    return [[Http]];
  }

  constructor(private http:Http) {

  }

  searchOpVenda(vid: any, did: any) {
    let opt: RequestOptions
    let myHeaders: Headers = new Headers;
    myHeaders.set('Access-Control-Allow-Origin', '*');
    myHeaders.append('Content-type', 'application/json');
    myHeaders.append('User', 'user');
    myHeaders.append('Password', 'Feup2016')


    opt = new RequestOptions({
      headers: myHeaders
    })
    console.log("opt" + opt.headers);

    var didstring;
    if(did < 10){
      didstring = "0"+did;
    }
    else
      didstring = did;
    var url = 'http://localhost:49822/api/OpVendas/'+ vid +'?dis_id=' + didstring;
    var response = this.http.get(url,opt).map(res => res.json());

    return response;
  }

  searchDistName(did: any) {
    let opt: RequestOptions
    let myHeaders: Headers = new Headers;
    myHeaders.set('Access-Control-Allow-Origin', '*');
    myHeaders.append('Content-type', 'application/json');
    myHeaders.append('User', 'user');
    myHeaders.append('Password', 'Feup2016')


    opt = new RequestOptions({
      headers: myHeaders
    })
    console.log("opt" + opt.headers);

    var didstring;
    if(did < 10){
      didstring = "0"+did;
    }
    else
      didstring = did;

    var url = 'http://localhost:49822/api/Distritos/'+ didstring;
    var response = this.http.get(url,opt).map(res => res.json());

    return response;
  }
}
