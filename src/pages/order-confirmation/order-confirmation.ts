import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InvoiceDTO } from '../../models/invoice.dto';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/domain/cart.service';
import { ClientDTO } from '../../models/customer.dto';
import { AddressDTO } from '../../models/address.dto';
import { CustomerService } from '../../services/domain/customer.service';
import { InvoiceService } from '../../services/domain/invoice.service';


@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  invoice: InvoiceDTO;
  cartItems: CartItem[];
  client: ClientDTO;
  address: AddressDTO;
  idInvoice: string;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public cartService: CartService,
     public clientService: CustomerService,
     public invoiceService: InvoiceService) {
    this.invoice = this.navParams.get('invoice');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;

    this.clientService.findById(this.invoice.client.id).
    subscribe(response => {
      this.client = response as ClientDTO;
      this.address = this.findAddress(this.invoice.shippingAddress.id, response['adress']);
    }, error => {
      this.navCtrl.setRoot('HomePage');
    });
  }

  private findAddress(id: string, list : AddressDTO[]) : AddressDTO {
    let position = list.findIndex(x => x.id == id);
    return list[position];

  }

  total() {
    return this.cartService.total();
  }

  back(){
    this.navCtrl.setRoot('CartPage');
  }

  home(){
    this.navCtrl.setRoot('CategoriesPage');
  }
  checkout(){
    this.invoiceService.insert(this.invoice)
      .subscribe(response => {
        this.cartService.createOrClearCart();
        this.idInvoice = this.extractId(response.headers.get('location'));

      }, error =>{
        if (error.status == 403){
          this.navCtrl.setRoot('HomePage');
        }
      });
  }

  private extractId(location: String){
    let position = location.lastIndexOf('/');
    return location.substring(position+1, location.length);
  }
}
