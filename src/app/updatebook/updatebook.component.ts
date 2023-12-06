import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { Book } from '../book';

@Component({
  selector: 'app-updatebook',
  templateUrl: './updatebook.component.html',
  styleUrls: ['./updatebook.component.css']
})
export class UpdatebookComponent implements OnInit {
  bookid!: number;
  titleControl!: FormControl;
  authorControl!: FormControl;
  descriptionControl!: FormControl;
  bookimgControl!: FormControl;
  genreControl!: FormControl;
  isbnControl!: FormControl;
  publishdateControl!: FormControl;
  publisherControl!: FormControl;
  totalcopiesControl!:FormControl;  

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private bookService: BookService,
    private router :Router,
  ) {}

  ngOnInit(): void {
    this.bookid = +this.route.snapshot.paramMap.get('bookid')!;

    this.bookService.find(this.bookid).subscribe((data) => {
      console.log(data);
      this.titleControl = new FormControl(data.title, Validators.required);
      this.authorControl = new FormControl(data.author, Validators.required);
      this.descriptionControl = new FormControl(data.description, Validators.required);
      this.bookimgControl = new FormControl(data.bookimg, Validators.required);
      this.genreControl = new FormControl(data.genre, Validators.required);
      this.isbnControl = new FormControl(data.isbn, Validators.required);
      this.publishdateControl = new FormControl(data.publishdate, Validators.required);
      this.publisherControl =new FormControl(data.publisher,Validators.required);
      this.totalcopiesControl= new FormControl(data.totalcopies,Validators.required);
    });
  }

  onSubmit() {
    const updatedBookData: Book = {
      bookid: this.bookid,
      title: this.titleControl.value,
      author: this.authorControl.value,
      description: this.descriptionControl.value,
      bookimg: this.bookimgControl.value,
      genre: this.genreControl.value,
      isbn: this.isbnControl.value,
      publishdate: this.publishdateControl.value,
      publisher: this.publisherControl.value,
      totalcopies: this.totalcopiesControl.value,
    };
  
    this.bookService.update(this.bookid, updatedBookData).subscribe(
      (res: any) => {
        console.log('Book updated successfully');
        alert('Details updated successfully!');
        this.router.navigateByUrl('/books');
      },
      (error) => {
        console.error('Error updating book:', error);
  
        if (error.status === 400) {
          alert('Bad request. Please check your input data.');
        } else {
          alert('An unexpected error occurred. Please try again later.');
        }
      }
    );
  }
  
  
}
