import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MenuPage } from '../pages/menu/menu';
import { HomePage } from '../pages/home/home';
import { TabsPage} from "../pages/tabs/tabs";
import { LoginPage } from "../pages/login/login";
import { GlobalService } from "./GlobalService";
import { DistrictPage } from "../pages/district/district";


@NgModule({
  declarations: [
    MyApp,
    MenuPage,
    HomePage,
    TabsPage,
    LoginPage,
    DistrictPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MenuPage,
    HomePage,
    TabsPage,
    LoginPage,
    DistrictPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, GlobalService]
})
export class AppModule {}
