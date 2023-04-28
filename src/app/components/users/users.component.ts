import { Component, OnInit } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { map } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/users.service';
declare var dataTableInit:any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  Users: User[];
  user:User = {key:'',username:'',name:'',email:'', personalEmail:'', mobileNumber:'',isAdmin:false};
  selectedProducts: User[];
  cols: any[];
  display = false;
  sibebarHeader = "Add Job";
  selectedKey=''
  userdetails: any;
  email:any
  constructor(
    public userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ){ }
    ngOnInit():void {
      this.cols = [
        { field: 'username', header: 'Username', customExportHeader: 'USERNAME' },
        { field: 'name', header: 'Name' },
        { field: 'email', header: 'Email' },
        { field: 'personalEmail', header: 'Personal Email' },
        { field: 'mobileNumber', header: 'Mobile Number' },
        { field: 'isAdmin', header: 'Is Admin' }
    ];
      this.userService.getAll().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ uid: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.Users = data;
      });
    }
    create() {   
      if(this.sibebarHeader == 'Edit User'){
        this.userService.update(this.selectedKey,this.user).then(() => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail:'User is edited succcessfully' });
          this.display = false;
          this.user = {key:'',username:'', name:'',email:'', personalEmail:'', mobileNumber:'',isAdmin:false}
        });
      }
      else{
      this.userService.create(this.user).then(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail:'User is edited succcessfully' });
        this.display = false;
        this.user = {key:'',username:'', name:'',email:'', personalEmail:'',mobileNumber:'',isAdmin:false}
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
      this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.userService.delete(key);
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
        },
        reject: (type) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                    break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                    break;
            }
        }
    });
    }
    sidenavClosed(){
      this.user = {key:'',username:'', name:'',email:'', personalEmail:'',mobileNumber:'',isAdmin:false}
    }
}
