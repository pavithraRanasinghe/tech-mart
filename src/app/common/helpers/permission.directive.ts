import {Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthenticationService} from '../services';

@Directive({
  selector: '[appPermission]'
})
export class PermissionDirective implements OnInit {
  private currentUser;
  private permissions = [];
  private logicalOp = 'AND';
  private isHidden = true;

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
      this.currentUser = this.authenticationService.getUser();
      this.updateView();
  }

  @Input()
  set appPermission(val) {
    this.permissions = val;
    this.updateView();
  }

  @Input()
  set appPermissionOp(permop) {
    this.logicalOp = permop;
    this.updateView();
  }

  private updateView() {
    if (this.checkPermission()) {
      if (this.isHidden) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.isHidden = false;
      }
    } else {
      this.isHidden = true;
      this.viewContainer.clear();
    }
  }

  private checkPermission() {
    let hasPermission = false;
    if (this.currentUser && this.currentUser.role.rolePermissions) {
      for (const checkPermission of this.permissions) {
        // tslint:disable-next-line:max-line-length
        const permissionFound = this.currentUser.role.rolePermissions.find(x => x.permission.permissionKey === checkPermission.toUpperCase());
        if (permissionFound) {
          hasPermission = true;
          if (this.logicalOp === 'OR') {
            break;
          }
        } else {
          hasPermission = false;
          if (this.logicalOp === 'AND') {
            break;
          }
        }
      }
    }
    return hasPermission;
  }
}
