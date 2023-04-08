import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Client } from '../models/client';
import { Email } from '../models/email';
@Injectable({
  providedIn: 'root',
})

export class emailService {
  private dbPath = '/email';
  tutorialsRef: AngularFireList<Email>;
  clientService: any;

  constructor( private db: AngularFireDatabase ) {
     this.tutorialsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Email> {
    return this.tutorialsRef;
  }

  create(tutorial: Email): any {
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
