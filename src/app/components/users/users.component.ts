import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  title = 'my-hr';
  User: User[] =[];

  constructor(
    public userService: UserService
    ){ }

    ngOnInit() {
      //this.dataState();
      let s = this.userService.GetUsersList(); 
      s.snapshotChanges().subscribe(data => {
        this.User = [];
        data.forEach(item => {
          let a = item.payload.toJSON(); 
          if(a != null){
            //a['$key'] = item.key;
            this.User.push(a as User);
          }
        })
      })
    }
    dataState() {     
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
