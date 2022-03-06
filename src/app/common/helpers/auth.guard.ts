import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { userTypeToPathMapping } from '../constants/user-path-mapper';

import {AppUserService, AuthenticationService} from '../services';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  protected returnUrl: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private appUserService: AppUserService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.appUserService.currentUserValue;
    this.returnUrl = this.route.snapshot.queryParams.returnUrl;
    if (route.url.length === 0) {
      const pathsForUserType = userTypeToPathMapping[currentUser.userType.valueOf()];
      const mainPath = pathsForUserType.path;
      if (this.returnUrl && this.returnUrl.split('/')[1] === mainPath) {
          this.router.navigateByUrl(this.returnUrl, {replaceUrl: true, state: {isLogin: true}});
        } else {
          this.router.navigateByUrl(mainPath, {replaceUrl: true, state: {isLogin: true}});
        }
    }

    if (currentUser) {
      return true;
    }
  }
}
