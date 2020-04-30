import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddressDTO } from '../../models/address.dto';
import { StorageService } from '../../services/storage.service';
import { CustomerService } from '../../services/domain/customer.service';

/**
 * Generated class for the PickAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items : AddressDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage : StorageService, public customerService : CustomerService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.customerService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['adress'];
        }, error => {
          if (error.status == 403){
            this.navCtrl.setRoot('HomePage');
          }
        })
    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }

}
