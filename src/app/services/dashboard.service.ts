import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Leave } from '../models/leave';
import { Email } from '../models/email';

@Injectable({
    providedIn: 'root',
})
export class dashboardService {
    private dbleavePath = '/leave';
    private dbemailPath = '/email';
    leavesRef: AngularFireList<Leave>;
    emailRef: AngularFireList<Email>;

    constructor(private db: AngularFireDatabase) {
        this.leavesRef = db.list(this.dbleavePath);
        this.emailRef = db.list(this.dbemailPath);
    }
    getLeavesAll(): AngularFireList<Leave> {
        return this.leavesRef;
    }
    getEmailAll(): AngularFireList<Email> {
        return this.emailRef;
    }
    
}