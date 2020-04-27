import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CityService } from '../../services/domain/city.service';
import { ProvinceService } from '../../services/domain/province.service';
import { ProvinceDTO } from '../../models/province.dto';
import { CityDTO } from '../../models/city.dto';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  provinces: ProvinceDTO[];
  cities: CityDTO[];

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public formBuilder: FormBuilder,
     public cityService: CityService,
     public provinceService: ProvinceService ) {

      this.formGroup = this.formBuilder.group({
        name: ['Jon Doe', [Validators.required, Validators.minLength(50), Validators.maxLength(120)]],
        email: ['jondoe@gmail.com', [Validators.required, Validators.email]],
        type: ['1', [Validators.required]],
        sinOrBn: ['0123456789', [Validators.required]],
        password: ['123', [Validators.required]],
        number: ['20', [Validators.required]],
        streetName: ['Keele St', [Validators.required]],
        unitNumber: ['', []],
        postalCode: ['2M2M2M', [Validators.required]],
        phone1: ['6470000000', [Validators.required]],
        phone2: ['',[]],
        phone3: ['',[]],
        provinceId: [null, [Validators.required]],
        cityId: [null, [Validators.required]]
      });
  }

  signupUser(){
    console.log("Form sent");
  }

  ionViewDidLoad(){
    this.provinceService.findAll().subscribe( response => {
      this.provinces = response;
      this.formGroup.controls.provinceId.setValue(this.provinces[0].id);
      this.updateCities();
    }, error => {});
  }

  updateCities(){
    let province_Id = this.formGroup.value.provinceId;
    this.cityService.findAll(province_Id).subscribe(
      response => {
        this.cities = response;
        this.formGroup.controls.cityId.setValue(null);
      }, error => {}
    );
  }
}
