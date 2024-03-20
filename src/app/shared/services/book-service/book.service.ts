import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../../types/Book.types';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiServerUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  /** HTTP CALLS **/

  getBooks(): Observable<Book[]> {
    return this.httpClient
      .get<Book[]>(`${this.apiServerUrl}/books`)
      .pipe(map((books) => this.transformBooksData(books)));
  }

  getBookById(id: Book['id']): Observable<Book> {
    return this.httpClient
      .get<Book>(`${this.apiServerUrl}/books/${id}`)
      .pipe(map(book => this.transformBooksData(book)));
  }

  addBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>(`${this.apiServerUrl}/books`, book);
  }

  updateBook(book: Book, id: Book['id']): Observable<Book> {
    return this.httpClient.put<Book>(`${this.apiServerUrl}/books/${id}`, book);
  }

  deleteBook(id: Book['id']): Observable<Book> {
    return this.httpClient.delete<Book>(`${this.apiServerUrl}/books/${id}`);
  }

  /** Transofrm the given books data JSON to have more fields as the inputs in the add book page **/
  private transformBooksData(books: Book[] | Book): any {
    if (Array.isArray(books)) {
      return books.map(book => this.transformBookData(book));
    } else {
      return this.transformBookData(books);
    }
  }
  
  private transformBookData(book: Book): Book {
    const transformedBook: Book = {
      ...book,
    };

    // Add isbn10 if it doesn't exist
    if (typeof book.isbn10 === 'undefined') {
      transformedBook.isbn10 = book.isbn;
    }
  
    // Add category if it doesn't exist
    if (typeof book.categories === 'undefined') {
      transformedBook.categories = ['Science', 'Software Engineering', 'Web programming']; // Assign default category array
    }
  
    // Add rating if it doesn't exist
    if (typeof book.rating === 'undefined') {
      transformedBook.rating = Math.floor(Math.random() * 6); // Generate random rating between 0 and 5
    }
  
    // Add image if it doesn't exist
    if (typeof book.images === 'undefined') {
      transformedBook.images = ['/assets/book-images/placeholder.jpg']; // Set default image placeholder from assets folder
    }
  
    return transformedBook;
  }

}
