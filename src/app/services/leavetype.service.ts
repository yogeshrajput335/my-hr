import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { LeaveType } from '../models/leavetype';

@Injectable({
  providedIn: 'root',
})
export class leavetypeService {
  private dbPath = '/leavetype';
  tutorialsRef: AngularFireList<LeaveType>;

  constructor(private db: AngularFireDatabase) {
    this.tutorialsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<LeaveType> {
    return this.tutorialsRef;
  }

  create(tutorial: LeaveType): any {
    return this.tutorialsRef.push(tutorial);
  }

  update(key: string, value: any): Promise<void> {
    return this.tutorialsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.tutorialsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.tutorialsRef.remove();
  }
}