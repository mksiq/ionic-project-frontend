import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InvoiceDTO } from '../../models/invoice.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  invoice: InvoiceDTO;

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder
    ) {
      this.invoice = this.navParams.get('invoice');

      this.formGroup = this.formBuilder.group({
        "@type": ["paymentCard", Validators.required]
      });
  }

  nextPage(){
    this.invoice.payment = this.formGroup.value;
    this.navCtrl.setRoot('OrderConfirmationPage', {invoice: this.invoice});
  }

}
