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
  clientemployeedetailsRef: AngularFireList<ClientEmployeeDetails>;
  constructor(private db: AngularFireDatabase) {
    this.clientemployeedetailsRef = db.list(this.dbPath);
  }
 getAll(): AngularFireList<ClientEmployeeDetails> {
    return this.clientemployeedetailsRef;
  }
 create(tutorial: ClientEmployeeDetails): any {
    return this.clientemployeedetailsRef.push(tutorial);
  }
 update(key: string, value: any): Promise<void> {
    return this.clientemployeedetailsRef.update(key, value);
  }
 delete(key: string): Promise<void> {
    return this.clientemployeedetailsRef.remove(key);
  }
 deleteAll(): Promise<void> {
    return this.clientemployeedetailsRef.remove();
  }
}