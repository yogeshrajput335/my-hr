import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { candidate } from '../models/candidate';
import { candidateFollowUp } from '../models/candidateFollowUp';

@Injectable({
  providedIn: 'root',
})

export class candidateService {
  private dbPath = '/candidate';
  private dbFollowUpPath='/candidateFollowUp';

  tutorialsRef: AngularFireList<candidate>;
  followUpsRef: AngularFireList<candidateFollowUp>;

  constructor(private db: AngularFireDatabase) {
    this.tutorialsRef = db.list(this.dbPath);
    this.followUpsRef = db.list(this.dbFollowUpPath);
  }

  getAll(): AngularFireList<candidate> {
    return this.tutorialsRef;
  }

  create(tutorial: candidate): any {
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
  createFollowUp(tutorial: candidateFollowUp): any {
    return this.followUpsRef.push(tutorial);
  }
  getAllFollowUps(): AngularFireList<candidateFollowUp> {
    return this.followUpsRef;
  }
}