import {SupplierModel} from './supplier.model';

export class ProductModel{
  productId: number;
  productName: string;
  description: string;
  sellingPrice: number;
  imgUrl: any;
  supplier: SupplierModel;
}
