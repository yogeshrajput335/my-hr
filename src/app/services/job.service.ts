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
  jobsRef: AngularFireList<Job>;
  jobservice: any;
  constructor( private db: AngularFireDatabase ) {
     this.jobsRef = db.list(this.dbPath);
  }
  getAll(): AngularFireList<Job> {
    return this.jobsRef;
  }
  create(tutorial: Job): any {
    return this.jobsRef.push(tutorial);
  }
  update(key: string, value: any): Promise<void> {
    return this.jobsRef.update(key, value);
  }
  delete(key: string): Promise<void> {
    return this.jobsRef.remove(key);
  }
  deleteAll(): Promise<void> {
    return this.jobsRef.remove();
  }
}
