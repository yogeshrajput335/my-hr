import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  title = 'my-hr';
  Users: User[];

  constructor(
    public userService: UserService
    ){ }

    ngOnInit() {
      //this.dataState();
      this.userService.getAll().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.Users = data;
      });
    }
    create() {   
      this.userService.create({username:'test',name:'name',email:'test@test.com',mobileNumber:121212}).then(() => {
        console.log('Created new item successfully!');
      });  
      // this.userService.GetStudentsList().valueChanges().subscribe(data => {
      //   this.preLoader = false;
      //   if(data.length <= 0){
      //     this.hideWhenNoStudent = false;
      //     this.noData = true;
      //   } else {
      //     this.hideWhenNoStudent = true;
      //     this.noData = false;
      //   }
      // })
    }
}
