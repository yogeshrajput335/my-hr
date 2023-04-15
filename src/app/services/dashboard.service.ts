import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Leave } from '../models/leave';

@Injectable({
    providedIn: 'root',
})
export class dashboardService {
    private dbleavePath = '/leave';
    leavesRef: AngularFireList<Leave>;

    constructor(private db: AngularFireDatabase) {
        this.leavesRef = db.list(this.dbleavePath);
    }
    getLeavesAll(): AngularFireList<Leave> {
        return this.leavesRef;
    }
    
}