import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { LeaveList } from '../models/leavelist';


@Injectable({
  providedIn: 'root',
})
export class leavelistService {
  private dbPath = '/leavelist';
  tutorialsRef: AngularFireList<LeaveList>;

  constructor(private db: AngularFireDatabase) {
    this.tutorialsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<LeaveList> {
    return this.tutorialsRef;
  }

  create(tutorial: LeaveList): any {
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