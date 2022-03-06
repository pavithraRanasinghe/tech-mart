import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {SpinnerComponent} from '../../../common/components/spinner/spinner.component';
import {MatDialog} from '@angular/material/dialog' ;

export interface ProductDetail {
  id: number;
  name: string;
  description: string;
  price: number;
  img: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('spinner') spinner: SpinnerComponent;

  images = [
    {
      image: 'assets/img/one.jpg',
      thumbImage: 'assets/img/one.jpg',
      alt: 'alt of image',
    },
    {
      image: 'assets/img/two.jpg',
      thumbImage: 'assets/img/two.jpg',
      alt: 'alt of image',
    },
    {
      image: 'assets/img/three.jpeg',
      thumbImage: 'assets/img/three.jpeg',
      alt: 'alt of image',
    },
    {
      image: 'assets/img/four.jpg',
      thumbImage: 'assets/img/four.jpg',
      alt: 'alt of image',
    },
    {
      image: 'assets/img/five.jpg',
      thumbImage: 'assets/img/five.jpg',
      alt: 'alt of image',
    }
  ];

  constructor(
    private router: Router,
    public dialog: MatDialog) {
  }

  list: any = [];
  productList: ProductDetail[] = [];
  productList2: ProductDetail[] = [];
  product: ProductDetail;

  ngAfterViewInit(): void {
    if (this.spinner) {
      // this.spinner.showSpinner();
    }
  }

  ngOnInit(): void {
    this.productList = [{
      id: 1,
      name: 'Name',
      description: 'Sample Description',
      price: 122344,
      img: 'assets/img/one.jpg'
    }, {
      id: 2,
      name: 'Name',
      description: 'Sample Description',
      price: 122344,
      img: 'assets/img/two.jpg'
    }, {
      id: 3,
      name: 'Name',
      description: 'Sample Description',
      price: 122344,
      img: 'assets/img/four.jpg'
    }, {
      id: 4,
      name: 'Name',
      description: 'Sample Description',
      price: 122344,
      img: 'assets/img/five.jpg'
    }, {
      id: 4,
      name: 'Name',
      description: 'Sample Description',
      price: 122344,
      img: 'assets/img/five.jpg'
    }];
    this.productList2 = [{
      id: 1,
      name: 'Name',
      description: 'Sample Description',
      price: 122344,
      img: 'assets/img/four.jpg'
    }, {
      id: 2,
      name: 'Name',
      description: 'Sample Description',
      price: 122344,
      img: 'assets/img/four.jpg'
    }, {
      id: 3,
      name: 'Name',
      description: 'Sample Description',
      price: 122344,
      img: 'assets/img/four.jpg'
    }, {
      id: 4,
      name: 'Name',
      description: 'Sample Description',
      price: 122344,
      img: 'assets/img/four.jpg'
    }, {
      id: 4,
      name: 'Name',
      description: 'Sample Description',
      price: 122344,
      img: 'assets/img/four.jpg'
    }];
    this.list.push(this.productList);
    this.list.push(this.productList2);

    console.log('List : ', this.list);
  }
  onSelect(event: any){
    this.router.navigateByUrl('/customer/product-detail', { state: {product: event } });
  }
}
