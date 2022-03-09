import {ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

import {AppUserService, AuthenticationService} from './common/services';
import {User} from './common/models';
import {filter, map} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {UserType} from './common/models/enums/user-types';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, OnChanges {

  public headerTitle: string;
  currentUser: User = null;
  customer = true;
  private routerDataSubscription: Subscription;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private appUserService: AppUserService,
    private changeDetectorRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.appUserService.currentUser.subscribe(x => {
        this.currentUser = x;
        this.changeDetectorRef.detectChanges();
        if (!this.appUserService.currentUserValue){
          this.router.navigate(['/login']);
        }
      });
    this.initiateTitleUpdating();
  }

  private initiateTitleUpdating() {
    this.routerDataSubscription = this.router
      .events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
        while (child.firstChild) {
          child = child.firstChild;
        }
        if (child.snapshot.data.title) {
          return child.snapshot.data.title;
        }
        // provide a default value if required
      })
    ).subscribe((title: string) => {
     this.headerTitle = title;
    });
  }

  ngOnDestroy() {
   if (this.routerDataSubscription) {
     this.routerDataSubscription.unsubscribe();
   }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('APP ON CHANGE');
    this.appUserService.currentUser.subscribe(currentUser => {
      this.currentUser = currentUser;
      if (this.currentUser.userType === UserType.customer){
        this.customer = false;
      }
    });
  }

  public check(){
    console.log('APP');
  }
}
