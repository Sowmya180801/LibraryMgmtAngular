import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  IsLoggedIn: boolean = false;
  users: User[] = [];
  id!:number;
  username!:string;
  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.IsLoggedIn = localStorage.getItem('User') != null;
    var x = localStorage.getItem('User'); 
   console.log(x);
  
    if(x){
      this.id=JSON.parse(x).userid;
      console.log(this.id);
      this.username=JSON.parse(x).username;
      console.log(this.username);  
     }
     this.userService.getAll().subscribe((data: User[])=>{
      this.users = data;
      console.log(this.users);
    })  
  
  }
  Logout() {
    localStorage.removeItem('User');
    location.href = '/login';
  }
}
