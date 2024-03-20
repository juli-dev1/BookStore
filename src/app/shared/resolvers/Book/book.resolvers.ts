import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { BookService } from '../../services/book-service/book.service';



@Injectable({providedIn: 'root'})
export class BookResolver implements  Resolve<any>{
  constructor(private bookService: BookService) {
  }
  resolve(route: ActivatedRouteSnapshot): Observable<any>{
    const bookId = route.params['id'];
    return this.bookService.getBookById(bookId).pipe(
      catchError(error => {
        return of({ error: 'book not found' });
      })
    );
  }

}
