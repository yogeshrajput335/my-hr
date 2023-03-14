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
  user:User = {username:'',name:'',email:'',mobileNumber:''};
  selectedProducts: User[];
  cols: any[];
  display = false;
  sibebarHeader = "Add Job";
  selectedKey=''
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
      if(this.sibebarHeader == 'Edit User'){
        this.userService.update(this.selectedKey,this.user).then(() => {
          console.log('Updated job successfully!');
          this.display = false;
          this.user = {username:'', name:'',email:'',mobileNumber:''}
        });
      }
      else{
      this.userService.create({username:'test',name:'name',email:'test@test.com',mobileNumber:''}).then(() => {
        console.log('Created new item successfully!');
        this.display = false;
        this.user = {username:'', name:'',email:'',mobileNumber:''}
      });
    }
    }
    AddUser(){
      this.display = true;
      this.sibebarHeader = 'Add User'
    }
    edit(key:string,user:User){
      this.display = true;
      this.sibebarHeader = 'Edit User'
      this.user = user;
      this.selectedKey = key;
  
    }
    delete(key:any){
      this.userService.delete(key);
    }
}
