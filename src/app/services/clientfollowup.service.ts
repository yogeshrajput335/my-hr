import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { ClientFollowUp } from '../models/clientfollowup';

@Injectable({
  providedIn: 'root',
})

export class clientfollowupService {
  private dbPath = '/clientfollowup';

  tutorialsRef: AngularFireList<ClientFollowUp>;

  constructor(private db: AngularFireDatabase) {
    this.tutorialsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<ClientFollowUp> {
    return this.tutorialsRef;
  }

  create(tutorial: ClientFollowUp): any {
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