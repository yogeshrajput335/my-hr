import { Component, OnInit } from '@angular/core';
import { AttendanceReport } from 'src/app/models/attendancereport';
import { attendancereportService } from 'src/app/services/attendancereport.service';
import { map } from 'rxjs';
import { attendanceService } from 'src/app/services/attendance.service';
import { Attendance } from 'src/app/models/attendance';
declare var dataTableInit:any;

@Component({
  selector: 'app-attendancereport',
  templateUrl: './attendancereport.component.html',
  styleUrls: ['./attendancereport.component.scss']
})

export class AttendanceReportComponent implements OnInit {
    Attendance:Attendance[];
    AttendanceReport: AttendanceReport[];
    attendance: Attendance = {
      Year: '',
      Month: '',
      NumberOfDays: '',
      PresentDate: new Date()
    };
    selStatus = "NEW"
    InitAttendance:any
    date:Date;
    value:Date;
    selectedProducts: Attendance[];
    cols: any[];
    display = false;
    sibebarHeader = 'Add Attendance';
    selectedKey = '';
    userDetails:any;

    constructor(public attendancereportservice: attendancereportService,
      public attendanceservice:attendanceService) {}

    ngOnInit(): void {
      this.userDetails=JSON.parse(localStorage.getItem('user')!)
      this.attendanceservice
      .getAll()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      ).subscribe((data:any) => {
        this.AttendanceReport= data;
      });
      this.cols = [
        { field: 'Year', header: 'Year', customExportHeader: 'YEAR' },
        { field: 'Month', header: 'Month' },
        { field: 'Status', header: 'Status' },
        { field: 'NumberOfDays', header: 'NumberOfDays' },
        { field: 'PresentDate', header: 'PresentDate' },
      ];
      this.attendanceservice
      .getAll()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      ).subscribe((data:any) => {
        this.InitAttendance=data;
        this.Attendance= this.selStatus =="ALL" ? this.InitAttendance : this.InitAttendance.filter((x:any)=>x.Status == this.selStatus)
        // this.AttendanceReport= data;
      });
  }
  create() {
    debugger
    this.attendance.Year=this.attendance.Year.toLocaleDateString();
    this.attendance.Month=this.attendance.Month.toLocaleDateString();
    this.attendance.Status = 'NEW';
    this.attendance.NumberOfDays = '12';
    this.attendance.PresentDate=this.attendance.PresentDate.toLocaleDateString();
    if (this.sibebarHeader == 'Edit Attendance') {
      this.attendanceservice
        .update(this.selectedKey, this.attendance)
        .then(() => {
          console.log('Updated job successfully!');
          this.display = false;
          this.attendance = {
            Year: '',
            Month: '',
            Status:'',
            NumberOfDays:'',
            PresentDate: new Date()
          };
        });
    } else {
        this.attendanceservice.create(this.attendance).then(() => {
          console.log('Created new item successfully!');
          this.display = false;
          this.attendance = {
            Year: '',
            Month: '',
            Status:'',
            NumberOfDays: '',
            PresentDate: new Date()
          };
        });
      }
    }
    AddAttendance() {
      this.display = true;
      this.sibebarHeader = 'Add Attendance';
    }
    edit(key: string, attendance: Attendance) {
      this.display = true;
      this.sibebarHeader = 'View Attendance';              
      this.attendance = attendance;
      this.selectedKey = key;
    }
    delete(key: any) {
      this.attendanceservice.delete(key);
    }
    approve(){
      debugger
      this.attendance.Status = "APPROVED";    
      this.attendanceservice.update(this.selectedKey,this.attendance).then(() => {
        console.log('Updated job successfully!');
        this.display = false;
        this.attendance= { Year: '', Month: '', Status:'', NumberOfDays: '', PresentDate: new Date() }
      });
    }
    reject(){
      this.attendance.Status = "REJECTED"
      this.attendanceservice.update(this.selectedKey,this.attendance).then(() => {
        console.log('Updated job successfully!');
        this.display = false;
        this.attendance = { Year: '', Month: '', Status:'', NumberOfDays: '', PresentDate: new Date()}
      });
    }
    OnStatusChange(){
      this.Attendance = this.selStatus =="ALL" ? this.InitAttendance : this.InitAttendance.filter((x:any)=>x.Status == this.selStatus)
    }
}
