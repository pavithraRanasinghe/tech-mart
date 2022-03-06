import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

import {AppUserService, AuthenticationService, LocalizationService, SupportedLanguages} from '../../services';

import {Router} from '@angular/router';

import {User} from '../../models';
import { UserType } from '../../models/enums/user-types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {

  @Input() public title;
  @Output() public sidenavToggle = new EventEmitter();
  @Output() public sideNavClose = new EventEmitter();
  currentUser: User = null;
  supportedLanguages = SupportedLanguages;
  public showMenu = true;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private appUserService: AppUserService,
    public localizationService: LocalizationService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.appUserService.currentUser.subscribe(currentUser => {
      this.currentUser = currentUser;
      this.showMenu = this.currentUser?.userType !== UserType.customer;
    });
  }

  ngOnInit() {}

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  public logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);

    this.sideNavClose.emit();
  }

  toggleLanguage() {
    this.localizationService.toggleLanguage();
  }
}
