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
  private dbemailPath = '/email';
  emailsRef: AngularFireList<Email>;
  clientService: any;
  constructor( private db: AngularFireDatabase ) {
     this.emailsRef = db.list(this.dbemailPath);
  }
  getEmailAll(): AngularFireList<Email> {
    return this.emailsRef;
  }
  create(tutorial: Email): any {
    return this.emailsRef.push(tutorial);
  }
  update(key: string, value: any): Promise<void> {
    return this.emailsRef.update(key, value);
  }
  delete(key: string): Promise<void> {
    return this.emailsRef.remove(key);
  }
  deleteAll(): Promise<void> {
    return this.emailsRef.remove();
  }
}
