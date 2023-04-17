import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { AttendanceReport } from '../models/attendancereport';
@Injectable({
  providedIn: 'root',
})
export class attendancereportService {
  private dbPath = '/attendancereport';
  attendancesRef: AngularFireList<AttendanceReport>;
  constructor(private db: AngularFireDatabase) {
    this.attendancesRef = db.list(this.dbPath);
  }
  getAll(): AngularFireList<AttendanceReport> {
    return this.attendancesRef;
  }
  create(tutorial: AttendanceReport): any {
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