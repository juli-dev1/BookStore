export interface Book {
    id?: string;
    title: string;
    subtitle?: string;
    description: string;
    categories: string[];
    author: string[];
    publisher: string;
    published: Date;
    pages: number;
    isbn: number;
    isbn10: number;
    isbn13: string;
    images: string[];
    rating: number;
}