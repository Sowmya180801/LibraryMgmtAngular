import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { BookService } from '../book.service';
import { Book } from '../book';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent {
  addBookForm: FormGroup;

  constructor(private fb: FormBuilder, private bookService: BookService, private router: Router) {

    this.addBookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
      bookimg: ['', Validators.required],
      genre: ['', Validators.required],
      isbn: ['', Validators.required],
      publishdate: ['', [Validators.required, this.pastDateValidator()]],
      publisher:['',[Validators.required]],
      totalcopies:['',[Validators.required , Validators.min(0)]],
    });
  }

  onSubmit() {
    const newBookData: Book = this.addBookForm.value;

    this.bookService.create(newBookData).subscribe(
      (data) => {
        console.log('Book added successfully:', data);
        alert("Book added Successfully");
        this.addBookForm.reset();
        this.router.navigateByUrl('/books');
      },
      (error) => {
        console.error('Error adding book:', error);
      }
    );
  }

  pastDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const currentDate = new Date();
      const inputDate = new Date(control.value);

      if (inputDate > currentDate) {
        return { 'pastDate': { value: control.value } };
      }

      return null;
    };
  }
}
