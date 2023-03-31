import { Component, OnInit } from '@angular/core';
import { Attendance } from 'src/app/models/attendance';
import { attendanceService } from 'src/app/services/attendance.service';
import { map } from 'rxjs';
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
    PresentDate: '',
  };
  selectedProducts: Attendance[];
  cols: any[];
  display = false;
  sibebarHeader = 'Add Attendance';
  selectedKey = '';

  constructor(public attendanceservice: attendanceService) {}

  ngOnInit(): void {
    this.cols = [
      { field: 'Year', header: 'year', customExportHeader: 'YEAR' },
      { field: 'Month', header: 'month' },
      { field: 'NumberOfDays', header: 'numberofdays' },
      { field: 'PresentDate', header: 'presentdate' },
    ];

    this.attendanceservice
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.Attendance = data;
      });
  }
  create() {
    if (this.sibebarHeader == 'Edit Attendance') {
      this.attendanceservice
        .update(this.selectedKey, this.attendance)
        .then(() => {
          console.log('Updated job successfully!');
          this.display = false;
          this.attendance = {
            Year: '',
            Month: '',
            NumberOfDays: '',
            PresentDate: '',
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
          PresentDate: '',
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
