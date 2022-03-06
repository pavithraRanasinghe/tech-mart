import { Component, OnInit } from '@angular/core';
import {ProductDetail} from '../admin-dashboard/admin-dashboard.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  public product: ProductDetail;
  constructor() { }

  ngOnInit(): void {

    this.product = history.state.product;
    console.log('Product : ', this.product);
  }

}
