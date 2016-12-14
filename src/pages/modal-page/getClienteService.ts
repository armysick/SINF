/**
 * Created by user on 13-12-2016.
 */
import {Http,RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

export class getClienteService {
  static get parameters() {
    return [[Http]];
  }

  constructor(private http:Http) {
  }

  getCliente(cid: any) {
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

    var url = 'http://localhost:49822/api/Clientes/'+ cid;
    var response = this.http.get(url,opt).map(res => res.json());

    return response;
  }

  getOPV(opvid: any){
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

    var url = 'http://localhost:49822/api/OpVendas/'+ opvid;
    var response = this.http.get(url,opt).map(res => res.json());

    return response;
  }

  getArtigos(){
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

    var url = 'http://localhost:49822/api/Artigos';
    var response = this.http.get(url,opt).map(res => res.json());

    return response;
  }

  insertSalesOrder(body){
    let opt: RequestOptions
    let myHeaders: Headers = new Headers;
    myHeaders.set('Access-Control-Allow-Origin', '*');
    myHeaders.append('Content-type', 'application/json');
    myHeaders.append('User', 'user');
    myHeaders.append('Password', 'Feup2016')

    opt = new RequestOptions({
      headers: myHeaders
    })


    var url = 'http://localhost:49822/api/DocVenda';
    var response = this.http.post(url,body,opt).map(res => res.json());

    console.log("RESPONSE : " + response);
    return response;
  }


  updateOPV(body, opvid){
    let opt: RequestOptions
    let myHeaders: Headers = new Headers;
    myHeaders.set('Access-Control-Allow-Origin', '*');
    myHeaders.append('Content-type', 'application/json');
    myHeaders.append('User', 'user');
    myHeaders.append('Password', 'Feup2016')

    opt = new RequestOptions({
      headers: myHeaders
    })


    console.log("opvid: " + opvid);
    var ovid = opvid.substring(4);
    console.log("ovid: " + ovid);
    var oid = +ovid;
    console.log("oid: " + oid);
    var url = 'http://localhost:49822/api/OpVendas/' + oid;
    var response = this.http.put(url,body,opt).map(res => res.json());

    console.log("RESPONSE : " + response);
    return response;
  }
}
