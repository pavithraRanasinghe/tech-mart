import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ProductGrid} from '../../../admin/components';
import {OrderService} from '../../../common/services/order.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {DriverServices} from '../../../common/services/driver.services';
import {VehicleServices} from '../../../common/services/vehicle.services';


@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  datasourceArr: ProductGrid[] = [];
  datasource: MatTableDataSource<ProductGrid>;
  displayedColumns: string[] = ['name', 'description', 'qty', 'price', 'supplier'];

  orderConfirmForm: FormGroup;
  private detail: any;
  private request: any;

  drivers = [];
  vehicles = [];

  constructor(private orderService: OrderService,
              private formBuilder: FormBuilder,
              private router: Router,
              private driverService: DriverServices,
              private vehicleService: VehicleServices) {
  }

  ngOnInit(): void {
    if (history.state.detail === undefined) {
      this.router.navigateByUrl('/sales-agent/orders');
    }
    this.detail = history.state.detail;
    this.datasourceArr = this.detail.orderDetailResponse;
    this.datasource = new MatTableDataSource<ProductGrid>(this.datasourceArr);
    this.datasource.paginator = this.paginator;

    this.orderConfirmForm = this.formBuilder.group({
      customer: [null],
      address: [null],
      driver: [null],
      vehicle: [null],

    });

    this.orderConfirmForm.get('customer').setValue(this.detail.customer.name);
    this.orderConfirmForm.get('address').setValue(this.detail.customer.address);

    this.loadAllDrivers();
    this.loadAllVehicles();
  }

  selectedRole(selectedProduct) {
    console.log('Selected Row  : ', selectedProduct);
  }

  onConfirm() {
    if (this.orderConfirmForm.valid) {
      this.request = {
        orderId: this.detail.id,
        salesAgentUserName: JSON.parse(localStorage.getItem('user')).name,
        vehicleId: this.orderConfirmForm.get('vehicle').value,
        driverId: this.orderConfirmForm.get('driver').value,
      };
    }
    this.orderService.confirm(this.request).subscribe(value => {
      this.router.navigateByUrl('/sales-agent/orders');
    });
  }

  loadAllVehicles() {
    this.vehicleService.findAllVehicles().subscribe((value: any) => {
      this.vehicles = value.object;
    });
  }

  loadAllDrivers() {
    this.driverService.findAllDrivers().subscribe((value: any) => {
      this.drivers = value.object;
    });
  }
}
