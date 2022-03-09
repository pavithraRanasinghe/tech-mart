import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {OrderRequest} from '../../../common/models/order-request';
import {OrderService} from '../../../common/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: any = [];
  public grandTotal !: number;
  private productDetail = [];

  private request: OrderRequest;

  constructor(private cartService: CartService,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(res => {
        this.products = res;
        this.grandTotal = this.cartService.getTotalPrice();
      });
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }

  emptyCart() {
    this.cartService.removeAllCart();
  }

  onCheckout() {
    const customer = JSON.parse(localStorage.getItem('user')).userId;
    this.products.forEach((product: any) => {
      console.log('Product : ', product);
      this.productDetail.push({
        productId: product.id,
        qty: product.quantity
      });
    });
    this.request = {
      customerId: customer,
      branchId: 1,
      requestList: this.productDetail
    };
    console.log('Request : ', this.request);
    this.orderService.placeOrder(this.request).subscribe(value => {
      this.emptyCart();
    });
  }
}
