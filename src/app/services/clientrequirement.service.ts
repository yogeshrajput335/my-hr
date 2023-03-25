import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { ClientRequirement } from '../models/clientrequirement';

@Injectable({
  providedIn: 'root',
})
export class clientrequirementService {
  private dbPath = '/clientrequirement';

  tutorialsRef: AngularFireList<ClientRequirement>;

  constructor(private db: AngularFireDatabase) {
    this.tutorialsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<ClientRequirement> {
    return this.tutorialsRef;
  }

  create(tutorial: ClientRequirement): any {
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