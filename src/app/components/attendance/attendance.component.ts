import { Component, OnInit } from '@angular/core';
import { Attendance } from 'src/app/models/attendance';
import { attendanceService } from 'src/app/services/attendance.service';
import { AttendanceReport } from 'src/app/models/attendancereport';
import { map } from 'rxjs';
import { attendancereportService } from 'src/app/services/attendancereport.service';
// import { getLocaleMonthNames } from '@angular/common';
declare var dataTableInit:any;
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
  Attendance: Attendance[];
  attendance: Attendance = {
    Year: '',
    Month: '',
    NumberOfDays: '',
    PresentDate: new Date()
  };
  date:Date;
  value:Date;
  selectedProducts: Attendance[];
  cols: any[];
  display = false;
  sibebarHeader = 'Add Attendance';
  selectedKey = '';
  userDetails:any;
   
  constructor(public attendanceservice: attendanceService,
    public attendancereportservice: attendancereportService) {}

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
      this.Attendance= data;
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
        map((changes) =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      ).subscribe((data:any) => {
        this.Attendance = data.filter((x:any)=>x.Year ==this.userDetails.year);
      });
  }

  create() {
    this.attendance.Year=this.attendance.Year.toLocaleDateString();
    this.attendance.Month=this.attendance.Month.toLocaleDateString();
    this.attendance.Status='NEW';
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
    this.sibebarHeader = 'Edit Attendance';
    attendance.Year = new Date(attendance.Year);
    attendance.Month = new Date(attendance.Month);
    attendance.PresentDate = new Date(attendance.PresentDate);
    this.attendance = attendance;
    this.selectedKey = key;
  }

  delete(key: any) {
    this.attendanceservice.delete(key);
  }
}
