import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RcSharedModule} from "../rc-shared.module";
import {TopMenuComponent} from "./components/top-menu/top-menu.component";
import {FooterComponent} from "./components/footer/footer.component";
import {ViewApplicationComponent} from "./components/view-application/view-application.component";

@NgModule({
  declarations: [
    TopMenuComponent,
    FooterComponent,
    ViewApplicationComponent
  ],
  imports: [
    CommonModule,
    RcSharedModule
  ],
  exports: [
    TopMenuComponent,
    FooterComponent,
    ViewApplicationComponent
  ]
})
export class RcReusableModule {
}
