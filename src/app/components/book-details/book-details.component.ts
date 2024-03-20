import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router } from "@angular/router";
import { Book } from '../../shared/types/Book.types';
import { BookService } from '../../shared/services/book-service/book.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [FormsModule, CarouselModule, RatingModule, ButtonModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent implements OnInit {

  public images!: string[];
  public id!: number;
  public book!: Book;
  public recommendedBooks!: Book[];
  public bookRating!: number | undefined;
  
  // Settings For Responsive PrimeNg Carousel
  public responsiveOptions: any[] = [
    {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    }
  ];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
  ) {}


  ngOnInit() {
    // Extract the 'id' parameter from the route
    this.id = this.route.snapshot.params["id"];
    
    if (this.id) {  
      // Check if there was an error resolving the question data
      if (this.route.snapshot.data["resolver"].error) {
        // Redirect user back
        this.router.navigate(['/']);
        alert("This Book dont exist");
      }
      this.book = this.route.snapshot.data["resolver"];
      this.bookRating = this.book.rating;
    }
    this.getRecommendedBooks();      
  }

  // We Use all books to display in recommended book section
  public getRecommendedBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (response) => {
        this.recommendedBooks = response;  
      },
      error: (error) => {
      },
    });
  }
  
}
