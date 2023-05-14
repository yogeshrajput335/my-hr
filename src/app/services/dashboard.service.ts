import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Leave } from '../models/leave';
import { Email } from '../models/email';
import { Attendance } from '../models/attendance';

@Injectable({
    providedIn: 'root',
})

export class dashboardService {
    private dbleavePath = '/leave';
    private dbemailPath = '/email';
    private dbattendancePath='/attendance';
    leavesRef: AngularFireList<Leave>;
    emailRef: AngularFireList<Email>;
    attendanceRef:AngularFireList<Attendance>;
    constructor(private db: AngularFireDatabase) {
        this.leavesRef = db.list(this.dbleavePath);
        this.emailRef = db.list(this.dbemailPath);
        this.attendanceRef=db.list(this.dbattendancePath);
    }
    getLeavesAll(): AngularFireList<Leave> {
        return this.leavesRef;
    }
    getAttendanceAll(): AngularFireList<Attendance> {
        return this.attendanceRef;
    }
}