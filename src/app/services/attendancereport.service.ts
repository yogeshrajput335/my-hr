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
  attendancereportsRef: AngularFireList<AttendanceReport>;
  constructor(private db: AngularFireDatabase) {
    this.attendancereportsRef = db.list(this.dbPath);
  }
  getAll(): AngularFireList<AttendanceReport> {
    return this.attendancereportsRef;
  }
  create(tutorial: AttendanceReport): any {
    return this.attendancereportsRef.push(tutorial);
  }
  update(key: string, value: any): Promise<void> {
    return this.attendancereportsRef.update(key, value);
  }
  delete(key: string): Promise<void> {
    return this.attendancereportsRef.remove(key);
  }
  deleteAll(): Promise<void> {
    return this.attendancereportsRef.remove();
  }
}