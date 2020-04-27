import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { CityService } from '../../services/domain/city.service';
import { ProvinceService } from '../../services/domain/province.service';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
  ],
  providers: [
    CityService ,
    ProvinceService
  ]
})
export class SignupPageModule {}
