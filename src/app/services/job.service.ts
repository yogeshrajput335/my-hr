import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Job } from '../models/job';

@Injectable({
  providedIn: 'root',
})

export class jobService {
  private dbPath = '/jobs';
  tutorialsRef: AngularFireList<Job>;

  constructor( private db: AngularFireDatabase ) {
     this.tutorialsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Job> {
    return this.tutorialsRef;
  }

  create(tutorial: Job): any {
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
