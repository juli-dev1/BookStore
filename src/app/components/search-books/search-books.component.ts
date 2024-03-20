import { Component, OnInit } from '@angular/core';
import { BookItemComponent } from '../book-item/book-item.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { CalendarModule } from 'primeng/calendar';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../../shared/services/book-service/book.service';
import { CategoryService } from '../../shared/services/category-service/category.service';
import { Book } from '../../shared/types/Book.types';
import { map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-search-books',
  standalone: true,
  imports: [
    BookItemComponent,
    CardModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    RatingModule,
    CalendarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './search-books.component.html',
  styleUrl: './search-books.component.css',
})
export class SearchBooksComponent implements OnInit {
  
  searchForm!: FormGroup;
  books: Book[] | undefined;
  filteredBooks: Book[] | undefined;
  categoriesOptions: any[] = [];

  constructor(private fb:FormBuilder, private bookService: BookService, private categoryService: CategoryService, private router: Router) {}

  ngOnInit() {
    this.formInit();
    this.getCategoriesOptions();
  }

  formInit() {
    this.searchForm = this.fb.group({
      searchInput: ['', ],
      categories:[[], ],
      rating: ['', ],
      yearRange: ['', ],
    })
  }


  onSubmit(): void {
    this.getFilteredBooks();
  }

  clearForm(): void {
    this.searchForm.reset();
    this.formInit();
  }

  public getFilteredBooks(): void {
    const {searchInput, categories, rating, yearRange} =this.searchForm.value;
    const startYear = yearRange[0];
    const endYear  = yearRange[1];
    
    this.filteredBooks = [];
    this.bookService.getBooks().subscribe({
      next: (response) => {
        this.filteredBooks = response.filter((book) => {
          const searchLowerCase = searchInput.toLowerCase();
          const titleMatch = book.title.toLowerCase().includes(searchLowerCase);
          const descriptionMatch = book.description.toLowerCase().includes(searchLowerCase);
          const subtitleMatch = book.subtitle?.toLowerCase().includes(searchLowerCase);
          // const authorMatch = book.author.toLowerCase().includes(searchLowerCase);
          const authorMatch = Array.isArray(book.author) && book.author.some(author => author.toLowerCase().includes(searchLowerCase));
          const ratingMatch = !rating || book.rating === rating;
          const publishedYearMatch = !startYear || !endYear || new Date(book.published).getFullYear() >= startYear.getFullYear() && new Date(book.published).getFullYear() <= endYear.getFullYear();
          const categoriesMatch = !categories.title || (Array.isArray(book.categories) && book.categories.some(category => category.toLowerCase().includes(categories.title.toLowerCase())));

          return (titleMatch || descriptionMatch || subtitleMatch || authorMatch) &&categoriesMatch&&
                 ratingMatch 
                 &&
                 publishedYearMatch;
        });  
      },
      error: (error) => {  
        alert(error.message)
      },
    });
  }

  getCategoriesOptions(): void {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categoriesOptions = response;  
      },
      error: (error) => {
        // alert(error.message)
      },
    });
  }


}
