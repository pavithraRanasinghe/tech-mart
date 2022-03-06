import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MessageService} from '../../../common/services';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {ProductModel} from '../../../common/models/product.model';
import {ProductService} from '../../../common/services/product.service';
import {SupplierService} from '../../../common/services/supplier.service';

export interface ProductGrid {
  id: number;
  name: string;
  description: string;
  price: number;
  supplier: string;
}

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})

export class ProductManagementComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  private product: ProductModel = {id: 0, name: '', description: '', price: 0, supplier: null};
  private initialObject: any;
  datasourceArr: ProductGrid[] = [];
  displayedColumns: string[] = ['name', 'description', 'price', 'supplier'];
  suppliers = [];

  datasource: MatTableDataSource<ProductGrid>;

  productForm: FormGroup;

  constructor(private productService: ProductService,
              private supplierService: SupplierService,
              private formBuilder: FormBuilder,
              private message: MessageService) {
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      id: [null],
      name: [null],
      description: [null],
      price: [null],
      image: [null],
      supplierId: [null]
    });
    this.loadAllProducts();
    this.loadAllSuppliers();
  }

  loadAllProducts() {
    this.productService.getAllProduct().subscribe((data: any) => {
      this.datasourceArr = data._embedded.skillList;
      this.datasource = new MatTableDataSource<ProductGrid>(this.datasourceArr);
      this.datasource.paginator = this.paginator;
    });
  }

  onSave() {
    if (this.productForm.valid) {
      this.product = {
        id: this.productForm.get('id').value,
        name: this.productForm.get('name').value,
        description: this.productForm.get('description').value,
        price: this.productForm.get('price').value,
        supplier: this.productForm.get('supplierId').value
      };
    }
    if (this.product.name === null || this.product.price === 0) {
      this.message.error('WARNING', 'Fields cannot be empty');
    } else {
      this.productService.saveProduct(this.product).subscribe(() => {
        this.message.success('SAVE_SUCCESSFUL', 'Product Save Successful');
        this.productForm.reset();
        this.loadAllProducts();
        // this.salesAgentForm.get('name').enable();
      });
    }
  }

  onUpdate() {
    if (this.productForm.valid) {
      this.product = {
        id: this.productForm.get('id').value,
        name: this.productForm.get('name').value,
        description: this.productForm.get('description').value,
        price: this.productForm.get('price').value,
        supplier: this.productForm.get('supplierId').value
      };
    }
    this.productService.updateProduct(this.product).subscribe(() => {
      this.message.success('UPDATE_SUCCESSFUL', 'Product details updated');
      this.productForm.reset(this.initialObject);
      this.loadAllProducts();
    });
  }

  selectedRole(selectedProduct) {
    this.product.id = selectedProduct.id;
    this.productForm.get('name').setValue(selectedProduct.name);
    this.productForm.get('description').setValue(selectedProduct.description);
    this.productForm.get('price').setValue(selectedProduct.price);
  }

  onDelete() {
    if (this.product.id !== 0) {
      this.productService.deleteProduct(this.product.id).subscribe(() => {
        this.message.success('DELETE_SUCCESSFUL', 'Product delete successful');
        this.productForm.reset(this.initialObject);
        this.loadAllProducts();
      }, error => {
        this.message.error('WARNING', error);
        this.productForm.reset();
      });
    }
  }

  loadAllSuppliers(){
    this.supplierService.getAllSuppliers().subscribe((value: any) => {
      console.log('Supplier : ', value);
      this.suppliers = value._embedded.supplierList;
    });
  }

}
