import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-singleview',
  templateUrl: './singleview.component.html',
  styleUrls: ['./singleview.component.css']
})
export class SingleviewComponent implements OnInit {
  bookid!: number;
  book: any;

  constructor(private route: ActivatedRoute, private bookService: BookService,private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bookid = params['bookid'];
    });

    this.bookService.find(this.bookid).subscribe(
      data => {
        this.book = data;
      },
      error => {
        console.error('Error fetching book:', error);
      }
    );
  }
   buyBook(): void {
    if (this.book.totalcopies > 0) {
      // Navigate to success page if totalcopies is greater than zero
      this.router.navigateByUrl('/success');
    } else {
      // Navigate to false page if totalcopies is zero or less
      this.router.navigateByUrl('/false');
    }
}
}
