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
  leavelistsRef: AngularFireList<LeaveList>;
  constructor(private db: AngularFireDatabase) {
    this.leavelistsRef = db.list(this.dbPath);
  }
  getAll(): AngularFireList<LeaveList> {
    return this.leavelistsRef;
  }
  create(tutorial: LeaveList): any {
    return this.leavelistsRef.push(tutorial);
  }
  update(key: string, value: any): Promise<void> {
    return this.leavelistsRef.update(key, value);
  }
  delete(key: string): Promise<void> {
    return this.leavelistsRef.remove(key);
  }
  deleteAll(): Promise<void> {
    return this.leavelistsRef.remove();
  }
}