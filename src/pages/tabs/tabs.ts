import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { MenuPage } from '../menu/menu';
import { DistrictPage } from '../district/district';
import {Events} from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = MenuPage;
  tab3Root: any = DistrictPage;

  constructor(private events: Events) {

  }

  search(){
    this.events.publish('testDistrictChange');
  }
}
