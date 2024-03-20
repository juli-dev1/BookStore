import { Component, Input, OnInit, Signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { Router } from '@angular/router';
import { Book } from '../../shared/types/Book.types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-item',
  standalone: true,
  imports: [CardModule, RatingModule, FormsModule],
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.css',
})
export class BookItemComponent implements OnInit{
  @Input({ required: true }) book!: Book;
  bookRating: number | undefined;

  constructor(private router: Router) {}


  ngOnInit() {
    this.bookRating = this.book.rating;
  }
  
  redirectToBookPage(id: Book['id']) {
    this.router.navigate(['/books', id]);
  }
}
