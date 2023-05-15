import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { ClientContactPerson } from '../models/clientcontactperson';

@Injectable({
  providedIn: 'root',
})

export class clientcontactpersonService {
  private dbPath = '/clientcontactperson';
  clientsRef: AngularFireList<ClientContactPerson>;
  clientService: any;
  constructor( private db: AngularFireDatabase ) {
     this.clientsRef = db.list(this.dbPath);
  }
  getAll(): AngularFireList<ClientContactPerson> {
    return this.clientsRef;
  }
  create(tutorial: ClientContactPerson): any {
    return this.clientsRef.push(tutorial);
  }
  update(key: string, value: any): Promise<void> {
    return this.clientsRef.update(key, value);
  }
  delete(key: string): Promise<void> {
    return this.clientsRef.remove(key);
  }
  deleteAll(): Promise<void> {
    return this.clientsRef.remove();
  }
}
