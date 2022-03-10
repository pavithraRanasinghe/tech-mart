import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserType} from '../../models/enums/user-types';
import {SpinnerComponent} from '../spinner/spinner.component';
import {CustomerService} from '../../services/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('spinner') spinner: SpinnerComponent;
  public registerForm: FormGroup;
  public userType = UserType.customer;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    protected formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.populateForm();
  }

  protected populateForm(): void {
    this.registerForm = this.formBuilder.group({
      name: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      email: [null],
      contactNo: [null],
      address: [null],
      city: [null],
    });
  }

  signUp(){
    if (this.registerForm.valid){
      this.customerService.signUpCustomer(this.registerForm.value).subscribe(value => {
        this.router.navigateByUrl('/login');
      });
    }
  }
}
