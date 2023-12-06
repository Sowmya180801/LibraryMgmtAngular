import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userid!: number;
  user!: User;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userIdParam = params.get('userid');

      if (userIdParam !== null && userIdParam !== undefined) {
        this.userid = +userIdParam;
        console.log(this.userid);

        this.userService.find(this.userid).subscribe((data: User) => {
          console.log(data);
          this.user = data;
        });
      } else {
        console.error("'userid' parameter is null or undefined");
      }
    });
  }
}
