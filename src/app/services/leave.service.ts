import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Leave } from '../models/leave';

@Injectable({
  providedIn: 'root',
})

export class leaveService {
  private dbPath = '/leave';
  leavesRef: AngularFireList<Leave>;
  constructor(private db: AngularFireDatabase) {
    this.leavesRef = db.list(this.dbPath);
  }
  getAll(): AngularFireList<Leave> {
    return this.leavesRef;
  }
  create(tutorial: Leave): any {
    return this.leavesRef.push(tutorial);
  }
  update(key: string, value: any): Promise<void> {
    return this.leavesRef.update(key, value);
  }
  delete(key: string): Promise<void> {
    return this.leavesRef.remove(key);
  }
  deleteAll(): Promise<void> {
    return this.leavesRef.remove();
  }
  getDashboardLeaves(isAdmin,Employee): AngularFireList<Leave> {
    if(isAdmin){
      return this.leavesRef;
    }
    else{
      return this.db.list(this.dbPath,ref => ref.orderByChild('Employee').equalTo(Employee));
    }
  }
}