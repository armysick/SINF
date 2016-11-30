/**
 * Created by user on 30-11-2016.
 */
import {Injectable} from '@angular/core';

@Injectable()
export class GlobalService {
  vendedor_id: any;
  iddistrito: number;

  constructor() {
    this.iddistrito = 1;
    //this.vendedor_id = "1234";
  }
}
