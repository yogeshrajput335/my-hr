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
  leavetypesRef: AngularFireList<LeaveType>;
  constructor(private db: AngularFireDatabase) {
    this.leavetypesRef = db.list(this.dbPath);
  }
  getAll(): AngularFireList<LeaveType> {
    return this.leavetypesRef;
  }
  create(tutorial: LeaveType): any {
    return this.leavetypesRef.push(tutorial);
  }
  update(key: string, value: any): Promise<void> {
    return this.leavetypesRef.update(key, value);
  }
  delete(key: string): Promise<void> {
    return this.leavetypesRef.remove(key);
  }
  deleteAll(): Promise<void> {
    return this.leavetypesRef.remove();
  }
}