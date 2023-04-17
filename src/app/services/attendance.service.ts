import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Attendance } from '../models/attendance';
@Injectable({
  providedIn: 'root',
})
export class attendanceService {
  private dbPath = '/attendance';
  attendancesRef: AngularFireList<Attendance>;
  constructor(private db: AngularFireDatabase) {
    this.attendancesRef = db.list(this.dbPath);
  }
  getAll(): AngularFireList<Attendance> {
    return this.attendancesRef;
  }
  create(tutorial: Attendance): any {
    return this.attendancesRef.push(tutorial);
  }
  update(key: string, value: any): Promise<void> {
    return this.attendancesRef.update(key, value);
  }
  delete(key: string): Promise<void> {
    return this.attendancesRef.remove(key);
  }
  deleteAll(): Promise<void> {
    return this.attendancesRef.remove();
  }
}