import {SupplierModel} from './supplier.model';

export class ProductModel{
  id: number;
  name: string;
  description: string;
  price: number;
  supplier: SupplierModel;
}
