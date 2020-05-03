import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProductDTO } from '../../models/product.dto';
import { ProductService } from '../../services/domain/product.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  items : ProductDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public productService: ProductService, public loadingControl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
    let categoryId = this.navParams.get('cat_id');
    let loader = this.presentLoading();
    this.productService.findByCategory(categoryId)
      .subscribe(response => {
        this.items = response['content'];
        loader.dismiss();
        this.loadImageUrls();
      }, error => {
        loader.dismiss();
      });
  }

  loadImageUrls(){
    for (var i=0; i<this.items.length;i++){
      let item = this.items[i];
      this.productService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        }, error => {});
    }
  }

  showDetail(id: string){
    this.navCtrl.push('ProductDetailPage', {prod_id: id});
  }

  presentLoading(){
    let loader = this.loadingControl.create({
      content: "Loading ..."
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher){
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
}
