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
  private dbPath = '/users';
  usersRef: AngularFireList<User>;
  constructor(private db: AngularFireDatabase) {
    this.usersRef = db.list(this.dbPath);
  }
  getAll(): AngularFireList<User> {
    return this.usersRef;
  }
  create(tutorial: User): any {
    return this.usersRef.push(tutorial);
  }
  update(key: string, value: any): Promise<void> {
    return this.usersRef.update(key, value);
  }
  delete(key: string): Promise<void> {
    return this.usersRef.remove(key);
  }
  deleteAll(): Promise<void> {
    return this.usersRef.remove();
  }
  
}