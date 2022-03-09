import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {OrderService} from '../../../common/services/order.service';
import {SalesAgentGrid} from "../../../admin/components";
import {Router} from "@angular/router";

export interface OrderElement {
  orderId: number;
  orderDate: string;
  customerName: string;
  customerAddress: string;
}


export interface OrderDetailElement {
  no: number;
  prodName: string;
  prodQt: number;
  unitPrice: number;
  total: number;
}


@Component({
  selector: 'app-order-grid',
  templateUrl: './order-grid.component.html',
  styleUrls: ['./order-grid.component.scss']
})
export class OrderGridComponent implements OnInit {

  @ViewChild('paginator', {static: true}) paginator!: MatPaginator;

  displayedColumns: string[] = ['orderId', 'orderDate', 'customerName', 'customerAddress', 'branch', 'actions'];
  datasource: MatTableDataSource<OrderElement>;
  datasourceArr: OrderElement[] = [];

  constructor(private orderService: OrderService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.loadAllOrders();
  }
  loadAllOrders(){
    this.orderService.findByStatus('PENDING').subscribe((value: any) => {
      this.datasourceArr = value.object;
      this.datasource = new MatTableDataSource<OrderElement>(this.datasourceArr);
      this.datasource.paginator = this.paginator;
    });
  }

  onSelected(row){
    console.log('Row : ', row);
    this.router.navigateByUrl('/sales-agent/detail', {state: {detail: row}});
  }
}


