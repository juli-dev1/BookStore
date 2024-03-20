import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { SaveImagesComponent } from '../../shared/components/save-images/save-images.component';
import { BookService } from '../../shared/services/book-service/book.service';
import { Book } from '../../shared/types/Book.types';
import { ChipsModule } from 'primeng/chips';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogService } from '../../shared/services/can-deactivate/dialog.service';

@Component({
  selector: 'app-add-books',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    FileUploadModule,
    ToastModule,
    CalendarModule,
    RatingModule,
    FormsModule,
    SaveImagesComponent,
    ChipsModule,
  ],
  templateUrl: './add-books.component.html',
  styleUrl: './add-books.component.css',
  providers: [MessageService],
})
export class AddBooksComponent implements OnInit {
  bookForm!: FormGroup;
  isSaved: boolean = false;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private bookService: BookService,
    private router: Router,
    public dialogService: DialogService
  ) {}

  ngOnInit() {
    this.formInit();
  }

  // Using CanDeactivate guard if user leave the form without submitting it
  canDeactivate(): Observable<boolean> | boolean {
    if (!this.isSaved && this.bookForm.dirty) {
      return this.dialogService.confirm('Discard changes for Books Form?');
    }
    return true;
  }

  formInit() {
    this.bookForm = this.fb.group({
      books: this.fb.array([this.createBookForm()]),
    });
  }

  createBookForm(): FormGroup {
    return this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(120),
          Validators.pattern(`^[a-zA-Z0-9@ "#&*!]+$`),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.maxLength(512),
          Validators.pattern('^[A-Z].*'),
        ],
      ],
      categories: [[], [Validators.required, Validators.maxLength(4)]],
      author: [[], [Validators.required, Validators.maxLength(3)]],
      publisher: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(60),
        ],
      ],
      // year: ['', [Validators.required, Validators.pattern('/^\d{4}$/')]],
      published: ['', Validators.required],
      pages: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.max(9999),
          Validators.pattern('^(?:[0-9]{1,4}|9999)$'),
        ],
      ],
      images: [[], Validators.required],
      options: [[], Validators.required],
      rating: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?:5(?:.0)?|(?:(?:[0-4](?:.d)?)|(?:.d)))$'),
        ],
      ],
      isbn10: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      isbn13: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
    });
  }

  books(): FormArray {
    return this.bookForm.get('books') as FormArray;
  }

  addBook() {
    this.bookForm.markAllAsTouched();
    if (!this.bookForm.valid) return;
    this.books().push(this.createBookForm());
  }

  removeBook(i: number) {
    this.books().removeAt(i);
  }

  onSubmit() {
    this.bookForm.markAllAsTouched();
    if (!this.bookForm.valid) return;
    const booksArray = this.bookForm.value.books;
    booksArray.map((book: Book) =>
      this.bookService.addBook(book).subscribe({
        next: (response) => {
          this.bookForm.reset();
          this.messageToaster('success', 'Book(s) created successfully');
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        error: (error) => {
          this.messageToaster('error', 'Try again later');
        },
      })
    );
  }

  onImageCreate(i: number, createdImages: string[]) {
    const faControl: any = (<FormArray>this.bookForm.controls['books']).at(i);
    faControl['controls'].images.setValue([createdImages]);
  }

  // This method better to be a service
  messageToaster(type: string, summary: string) {
    this.messageService.add({
      severity: type,
      summary: summary,
      detail: '',
    });
  }
}
