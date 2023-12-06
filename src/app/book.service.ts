import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import {  Observable, throwError,BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Book } from './book';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiURL ="https://localhost:7069/api";
  private ApiUrl ="https://localhost:7069/api/books"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
  
    return this.httpClient.get(this.ApiUrl)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
 
  create(data:any): Observable<any> {
    return this.httpClient.post(this.apiURL + '/books/', JSON.stringify(data), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  } 


  find(id:number): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/books/' + id)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
  update(id: number, data: Book): Observable<any> {
    return this.httpClient.put(this.apiURL + '/books/' + id, data, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  
  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/books/' + id, this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }

  public search = new BehaviorSubject<string>("");
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
