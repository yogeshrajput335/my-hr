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
  tutorialsRef: AngularFireList<ClientContactPerson>;
  clientService: any;

  constructor( private db: AngularFireDatabase ) {
     this.tutorialsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<ClientContactPerson> {
    return this.tutorialsRef;
  }

  create(tutorial: ClientContactPerson): any {
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
