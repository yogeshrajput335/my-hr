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
    AttendanceReport: AttendanceReport[];
    attendance: AttendanceReport = {
      Year: '',
      Month: '',
      Status:'',
      NumberOfDays: '',
      PresentDate: new Date(),
    };
    selStatus = "NEW"
    InitAttendance:any
    date:Date;
    value:Date;
    selectedProducts: AttendanceReport[];
    cols: any[];
    display = false;
    sibebarHeader = 'Add AttendanceReport';
    selectedKey = '';
    userDetails:any;
  
    constructor(public attendancereportservice: attendancereportService,
      public attendanceservice:attendanceService) {}
  
    ngOnInit(): void {
      this.userDetails=JSON.parse(localStorage.getItem('user')!)
      this.attendancereportservice
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      ).subscribe((data) => {
        this.AttendanceReport= data;
      });
      this.cols = [
        { field: 'Year', header: 'year', customExportHeader: 'YEAR' },
        { field: 'Month', header: 'month' },
        { field: 'Status', header: 'Status' },
        { field: 'NumberOfDays', header: 'numberofdays' },
        { field: 'PresentDate', header: 'presentdate' },
      ];
      
      this.attendancereportservice
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      ).subscribe((data:any) => {
        this.AttendanceReport=data.filter((x:any)=>x.Employee==this.userDetails.name);
        this.AttendanceReport= data;
      });
  }
  create() {
    this.attendance.Year=this.userDetails.year;
    this.attendance.Month=this.userDetails.month;
    this.attendance.Status = 'NEW';
    this.attendance.NumberOfDays = '12';
    this.attendance.PresentDate=this.attendance.PresentDate.toLocaleDateString();
    if (this.sibebarHeader == 'Edit AttendanceReport') {
      this.attendancereportservice
        .update(this.selectedKey, this.attendance)
        .then(() => {
          console.log('Updated job successfully!');
          this.display = false;
          this.attendance = {
            Year: '',
            Month: '',
            Status:'',
            NumberOfDays:'',
            PresentDate: new Date(),
          };
        });
    } else {
        this.attendancereportservice.create(this.attendance).then(() => {
          console.log('Created new item successfully!');
          this.display = false;
          this.attendance = {
            Year: '',
            Month: '',
            Status:'',
            NumberOfDays: '',
            PresentDate: new Date(),
          };
        });
      }
    }
    AddAttendanceReport() {
      this.display = true;
      this.sibebarHeader = 'Add Attendance Report';
    }
    edit(key: string, attendancereport: AttendanceReport) {
      this.display = true;
      this.sibebarHeader = 'Edit Attendance Report';                   
      this.attendance = attendancereport;
      this.selectedKey = key;
    }
    delete(key: any) {
      this.attendancereportservice.delete(key);
    }
    approve(){
      this.attendance.Status = "APPROVED"
      this.attendanceservice.update(this.selectedKey,this.attendance).then(() => {
        console.log('Updated job successfully!');
        this.display = false;
        this.attendance= { Year: '', Month: '', NumberOfDays: '', PresentDate: new Date() }
      });
    }
    reject(){
      this.attendance.Status = "REJECTED"
      this.attendanceservice.update(this.selectedKey,this.attendance).then(() => {
        console.log('Updated job successfully!');
        this.display = false;
        this.attendance = { Year: '', Month: '', NumberOfDays: '', PresentDate: new Date()}
      });
    }
    OnStatusChange(){
      this.AttendanceReport = this.selStatus =="ALL" ? this.InitAttendance : this.InitAttendance.filter((x:any)=>x.Status == this.selStatus)
    }
  
}
