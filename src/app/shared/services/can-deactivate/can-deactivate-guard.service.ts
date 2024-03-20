import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
  }
  
  @Injectable({providedIn: 'root',})
  export class CanDeactivateGuard {
    canDeactivate(component: CanComponentDeactivate, 
             route: ActivatedRouteSnapshot, 
             state: RouterStateSnapshot) {
       return component.canDeactivate ? component.canDeactivate() : true;
    }
  }