import { Routes } from '@angular/router';
import { AddBooksComponent } from './components/add-books/add-books.component';
import { SearchBooksComponent } from './components/search-books/search-books.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookResolver } from './shared/resolvers/Book/book.resolvers';
import { CanDeactivateGuard } from './shared/services/can-deactivate/can-deactivate-guard.service';

export const routes: Routes = [
    {    
        path: 'book',
        data: {
            breadcrumb: 'Books'
        },
        title: 'Books', 
        children:[
            {
                path: 'add',
                data: {
                    breadcrumb: 'Add'
                },
                title: 'Add Books', 
                component: AddBooksComponent,
                canDeactivate: [CanDeactivateGuard]
            }
        ]
    },
    {
        path: 'search-books',
        data: {
            breadcrumb: 'Search'
        },
        title: 'Search',
        component: SearchBooksComponent,
    },
    {
        path: 'books/:id',
        data: {
            breadcrumb: 'Category'
        },
        title: 'Book details',
        component: BookDetailsComponent,
        resolve: { resolver: BookResolver },
    },
    { 
        path: '**', 
        redirectTo: '/search-books', 
        pathMatch: 'full' 
    },
];
