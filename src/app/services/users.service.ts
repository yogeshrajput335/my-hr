import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  usersRef: AngularFireList<any> | undefined;
  userRef: AngularFireObject<any> | undefined;
  constructor(private db: AngularFireDatabase) {}
  // Create User
  AddUser(u: User) {
    this.usersRef?.push({
      username: u.username,
      name: u.name,
      email: u.email,
      mobileNumber: u.mobileNumber,
    });
  }
  // Fetch Single User Object
  GetUser(id: string) {
    this.userRef = this.db.object('users/' + id);
    return this.userRef;
  }
  // Fetch Users List
  GetUsersList() {
    this.usersRef = this.db.list('users');
    debugger
    return this.usersRef;
  }
  // Update User Object
  UpdateUser(student: User) {
    this.userRef?.update({
      username: student.username,
      name: student.name,
      email: student.email,
      mobileNumber: student.mobileNumber,
    });
  }
  // Delete User Object
  DeleteUser(id: string) {
    this.userRef = this.db.object('users/' + id);
    this.userRef.remove();
  }
}