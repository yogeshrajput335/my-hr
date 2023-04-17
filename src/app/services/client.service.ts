import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Client } from '../models/client';
import { ClientFollowUp } from '../models/clientfollowup';
import { ClientRequirement } from '../models/clientrequirement';
import { ClientContactPerson } from '../models/clientcontactperson';
@Injectable({
  providedIn: 'root',
})
export class clientService {
  private dbPath = '/client';
  private dbFollowUpPath='/clientFollowUp';
  private dbRequirementsPath='/clientRequirement';
  private dbContactPersonPath='/clientContactPerson';
  clientsRef: AngularFireList<Client>;
  followUpsRef: AngularFireList<ClientFollowUp>;
  requirementRef: AngularFireList<ClientRequirement>;
  contactpersonRef: AngularFireList<ClientContactPerson>;
  constructor( private db: AngularFireDatabase ) {
     this.clientsRef = db.list(this.dbPath);
     this.followUpsRef = db.list(this.dbFollowUpPath);
     this.requirementRef = db.list(this.dbRequirementsPath);
     this.contactpersonRef = db.list(this.dbContactPersonPath);
  }
  getAll(): AngularFireList<Client> {
    return this.clientsRef;
  }
  create(tutorial: Client): any {
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
  createFollowUp(tutorial: ClientFollowUp): any {
    return this.followUpsRef.push(tutorial);
  }
  getclientFollowUps(): AngularFireList<ClientFollowUp> {
    return this.followUpsRef;
  }
  createRequirement(tutorial: ClientRequirement): any {
    return this.requirementRef.push(tutorial);
  }
  getAllRequirements(): AngularFireList<ClientRequirement> {
    return this.requirementRef;
  }
  createContactPerson(tutorial: ClientContactPerson): any {
    return this.contactpersonRef.push(tutorial);
  }
  getAllContactPerson(): AngularFireList<ClientContactPerson> {
    return this.contactpersonRef;
  }
}
