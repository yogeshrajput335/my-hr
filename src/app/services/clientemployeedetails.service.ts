import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { ClientEmployeeDetails } from '../models/clientemployeedetails';

@Injectable({
  providedIn: 'root',
})
export class clientemployeedetailsService {
  private dbPath = '/clientemployeedetails';
  tutorialsRef: AngularFireList<ClientEmployeeDetails>;

  constructor(private db: AngularFireDatabase) {
    this.tutorialsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<ClientEmployeeDetails> {
    return this.tutorialsRef;
  }

  create(tutorial: ClientEmployeeDetails): any {
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