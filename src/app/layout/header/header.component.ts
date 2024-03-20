import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, InputTextModule, BreadcrumbComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Search',
        icon: 'pi pi-search',
        routerLink: '/search-books'
      },
      {
        label: 'Add Book',
        icon: 'pi pi-plus',
        routerLink: '/book/add'
      },
    ];
  }
  
}
