/**
 * Created by user on 13-12-2016.
 */
import {Http,RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

export class HomeService {
  static get parameters() {
    return [[Http]];
  }

  constructor(private http:Http) {

  }

  suggestedDistrict(vid: any) {
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

    var url = 'http://localhost:49822/api/Distritos?vid='+ vid;
    var response = this.http.get(url,opt).map(res => res.json());

    return response;
  }
}
