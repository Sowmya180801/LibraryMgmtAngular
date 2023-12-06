import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit{
  bookid!: number;
  book!: Book;
  allBooks: Book[] = [];  

  constructor(private route: ActivatedRoute, private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getAll().subscribe((data: Book[]) => {
      this.allBooks = data;
     
    });
  }
  deleteBook(bookid: number): void {
    this.bookService.delete(bookid).subscribe(
      () => {
        console.log('Book deleted successfully');
        alert("Book deleted successfully")
        this.allBooks = this.allBooks.filter(book => book.bookid !== bookid);
      },
      (error) => {
        console.error('Error deleting book:', error);
      }
    );
  }
}
