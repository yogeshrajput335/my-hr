import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})

export class employeeService {
  private dbPath = '/employee';
  employeesRef: AngularFireList<Employee>;
  constructor(private db: AngularFireDatabase) {
    this.employeesRef = db.list(this.dbPath);
  }
  
  getAll(): AngularFireList<Employee> {
    return this.employeesRef;
  }
  create(tutorial: Employee): any {
    return this.employeesRef.push(tutorial);
  }
  update(key: string, value: any): Promise<void> {
    return this.employeesRef.update(key, value);
  }
  delete(key: string): Promise<void> {
    return this.employeesRef.remove(key);
  }
  deleteAll(): Promise<void> {
    return this.employeesRef.remove();
  }
}