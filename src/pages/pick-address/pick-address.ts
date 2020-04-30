import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddressDTO } from '../../models/address.dto';
import { StorageService } from '../../services/storage.service';
import { CustomerService } from '../../services/domain/customer.service';
import { InvoiceDTO } from '../../models/invoice.dto';
import { CartService } from '../../services/domain/cart.service';

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
  invoice : InvoiceDTO;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage : StorageService,
    public customerService : CustomerService,
    public cartService : CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.customerService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['adress'];

          let cart = this.cartService.getCart();

          this.invoice = {
            client: {id: response['id']},
            shippingAddress: null,
            payment: null,
            items: cart.items.map( x => { return {quantity: x.quantity, product: {id: x.product.id}}})
          }
        }, error => {
          if (error.status == 403){
            this.navCtrl.setRoot('HomePage');
          }
        })
    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  nextPage(item: AddressDTO){
    this.invoice.shippingAddress = {id: item.id};
    this.navCtrl.push('PaymentPage', {invoice: this.invoice});
  }
}
