import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpMethod } from '../models/http-method';
import { HttpService } from './http.service';
import {ProductModel} from '../models/product.model';

const BASE_URL = `${environment.apiUrl}/products`;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpService: HttpService) { }

  public saveProduct(prod: ProductModel) {
    console.log('Prod', prod);
    const formData = new FormData();
    formData.append('productId', prod.productId + '');
    formData.append('productName', prod.productName);
    formData.append('description', prod.description);
    formData.append('sellingPrice', prod.sellingPrice + '');
    formData.append('imgUrl', prod.imgUrl);
    formData.append('supplierId', prod.supplier + '');
    return this.httpService.sendHttp(BASE_URL, HttpMethod.POST, formData);
  }

  public updateProduct(prod: ProductModel) {
    return this.httpService.sendHttp(BASE_URL, HttpMethod.PUT, prod);
  }

  public deleteProduct(id: number) {
    return this.httpService.sendHttp(`${BASE_URL}/${id}`, HttpMethod.DELETE);
  }

  public getAllProduct(){
    return this.httpService.sendHttp(BASE_URL, HttpMethod.GET);
  }
}
