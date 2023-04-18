import { Component, OnInit } from '@angular/core';
import { Attendance } from 'src/app/models/attendance';
import { attendanceService } from 'src/app/services/attendance.service';
import { AttendanceReport } from 'src/app/models/attendancereport';
import { map } from 'rxjs';
import { attendancereportService } from 'src/app/services/attendancereport.service';
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
    PresentDate: new Date(),
  };
  date:Date;
  value:Date;
  selectedProducts: Attendance[];
  cols: any[];
  display = false;
  sibebarHeader = 'Add Attendance';
  selectedKey = '';
  userDetails:any;
  AttendanceReport: { Year?: string | undefined; Month?: string | undefined; NumberOfDays?: any; PresentDate?: any; key: string | null; }[];
  constructor(public attendanceservice: attendanceService,
    public attendancereportservice: attendancereportService) {}
  ngOnInit(): void {
    this.userDetails=JSON.parse(localStorage.getItem('user')!)
    this.attendanceservice
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
      { field: 'Year', header: 'Year', customExportHeader: 'YEAR' },
      { field: 'Month', header: 'Month' },
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
        this.Attendance = data.filter((x:any)=>x.Year ==this.userDetails.name);
      });
  }
  create() {
    this.attendance.Year=this.userDetails.year;
    this.attendance.Month=this.userDetails.month;
    this.attendance.NumberOfDays = '12';
    this.attendance.PresentDate=this.attendance.PresentDate.toLocaleDateString();
    if(this.sibebarHeader == 'Edit Attendance') {
      this.attendanceservice
        .update(this.selectedKey, this.attendance)
        .then(() => {
          console.log('Updated job successfully!');
          this.display = false;
          this.attendance = {
            Year:'',
            Month: '',
            NumberOfDays:'',
            PresentDate: new Date(),
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
          PresentDate: new Date(),
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
    this.attendance = attendance;
    this.selectedKey = key;
  }
  delete(key: any) {
    this.attendanceservice.delete(key);
  }
}
