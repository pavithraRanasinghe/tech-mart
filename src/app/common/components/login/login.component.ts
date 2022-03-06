import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService, LocalizationService, MessageService} from '../../services';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {userTypeToPathMapping} from '../../constants/user-path-mapper';
import {UserType} from '../../models/enums/user-types';
import {SpinnerComponent} from '../spinner/spinner.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('spinner') spinner: SpinnerComponent;
  public form: FormGroup;
  invalidLogin = false;
  private returnUrl: string;
  public userType = UserType.customer;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    protected formBuilder: FormBuilder,
    public localizationService: LocalizationService,
    private message: MessageService) {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl;
  }

  ngOnInit() {
    this.populateForm();
    if (localStorage.getItem('user')){
      this.authenticationService.logout();
    }
    const returnUrl = this.route.snapshot.queryParams[`url`];
    if (returnUrl) {
      this.returnUrl = returnUrl;
      const userRoute = returnUrl.split('/')[1];
      if (userRoute !== userTypeToPathMapping[this.userType].path) {
        for (const userType in userTypeToPathMapping) {
          if (userTypeToPathMapping.hasOwnProperty(userType) && userTypeToPathMapping[userType].path === userRoute) {
            this.userType = userType as UserType;
            break;
          }
        }
      }
    }
  }

  protected populateForm(): void {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  checkLogin() {
    this.spinner.showSpinner();
    this.authenticationService.basicLogin(this.form.value).pipe(first()).subscribe(
      data => {
        this.userType = data.object.userType;
        this.authenticationService.setUser(data);
        const pathsForUserType = userTypeToPathMapping[this.userType];
        const mainPath = pathsForUserType.path;
        if (this.returnUrl && this.returnUrl.split('/')[1] === mainPath) {
          this.router.navigateByUrl(this.returnUrl, {replaceUrl: true, state: {isLogin: true}});
        } else {
          this.router.navigateByUrl(mainPath, {replaceUrl: true, state: {isLogin: true}});
        }
        this.invalidLogin = false;
        this.message.success('', 'Welcome ');
        this.spinner.hideSpinner();
      },
      error => {
        this.invalidLogin = true;
        console.log(error);
        this.message.error('LOGIN_FAILED', error);
        this.spinner.hideSpinner();
      }
    );
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      if (this.form.valid){
        this.checkLogin();
      } else {
        this.message.error('LOGIN_FAILED', 'LOGIN_INCOMPLETE');
      }
    }
  }
}
