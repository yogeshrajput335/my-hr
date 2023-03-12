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
  Users: User[];
  selectedProducts: User[];
  cols: any[];
  constructor(
    public userService: UserService
  ){ }

    ngOnInit() {
      this.cols = [
        { field: 'username', header: 'Username', customExportHeader: 'USERNAME' },
        { field: 'name', header: 'Name' },
        { field: 'email', header: 'Email' },
        { field: 'mobileNumber', header: 'Mobile Number' }
    ];


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
    }
}
