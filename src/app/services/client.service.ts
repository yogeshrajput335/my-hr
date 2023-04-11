import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Client } from '../models/client';
import { ClientFollowUp } from '../models/clientfollowup';

@Injectable({
  providedIn: 'root',
})

export class clientService {
  private dbPath = '/client';
  private dbFollowUpPath='/candidateFollowUp';
  tutorialsRef: AngularFireList<Client>;
  clientService: any;
  followUpsRef: AngularFireList<ClientFollowUp>;

  constructor( private db: AngularFireDatabase ) {
     this.tutorialsRef = db.list(this.dbPath);
     this.followUpsRef = db.list(this.dbFollowUpPath);
  }

  getAll(): AngularFireList<Client> {
    return this.tutorialsRef;
  }

  create(tutorial: Client): any {
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
  createFollowUp(tutorial: ClientFollowUp): any {
    return this.followUpsRef.push(tutorial);
  }
  getAllFollowUps(): AngularFireList<ClientFollowUp> {
    return this.followUpsRef;
  }
}
