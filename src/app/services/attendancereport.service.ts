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
  tutorialsRef: AngularFireList<AttendanceReport>;

  constructor(private db: AngularFireDatabase) {
    this.tutorialsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<AttendanceReport> {
    return this.tutorialsRef;
  }

  create(tutorial: AttendanceReport): any {
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