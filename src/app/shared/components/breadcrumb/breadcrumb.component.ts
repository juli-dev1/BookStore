import { Component } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import {isNullOrUndefined} from 'is-what';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [BreadcrumbModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})
export class BreadcrumbComponent {

  items: MenuItem[] | undefined;
  readonly home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
      this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.items = this.createBreadcrumbs(this.activatedRoute.root));
    }

    private createBreadcrumbs(route: ActivatedRoute, routerLink: string = '', breadcrumbs: MenuItem[] = []):any {
      const children: ActivatedRoute[] = route.children;
  
      if (children.length === 0) {
        return breadcrumbs;
      }
  
      for (const child of children) {
        const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
        if (routeURL !== '') {
          routerLink += `/${routeURL}`;
        }
  
        const label = child.snapshot.data[BreadcrumbComponent.ROUTE_DATA_BREADCRUMB];
        if (!isNullOrUndefined(label)) {
          breadcrumbs.push({label, routerLink});
        }

        return this.createBreadcrumbs(child, routerLink, breadcrumbs);
      }
    }
}
