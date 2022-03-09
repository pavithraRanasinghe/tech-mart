import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {CartService} from '../../services/cart.service';
import {ProductService} from '../../../common/services/product.service';
import {Product} from '../../../common/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public productList: any;
  private product: Product;
  private list: Product[] = [];
  public filterCategory: any;
  searchKey = '';

  constructor(private api: ApiService,
              private cartService: CartService,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getAllProduct()
      .subscribe((res: any) => {
        console.log('Res : ', res);
        for (const value of res.object) {
          this.product = {
            id: value.productId,
            category: '',
            description: value.description,
            image: value.imgUrl,
            price: value.sellingPrice,
            quantity: 100,
            title: value.productName,
            total: value.sellingPrice
          };
          this.list.push(this.product);
        }
        this.productList = this.list;
        this.filterCategory = this.list;
        this.productList.forEach((a: any) => {
          if (a.category === "women's clothing" || a.category === "men's clothing") {
            a.category = 'fashion';
          }
          Object.assign(a, {quantity: 1, total: a.price});
        });
        console.log(this.productList);
      });

    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }

  addtocart(item: any) {
    this.cartService.addToCart(item);
  }

  filter(category: string) {
    this.filterCategory = this.productList
      .filter((a: any) => {
        if (a.category === category || category === '') {
          return a;
        }
      });
  }

}
