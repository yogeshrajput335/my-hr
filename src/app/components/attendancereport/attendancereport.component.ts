import { Component } from '@angular/core';
import { AttendanceReport } from 'src/app/models/attendancereport';
import { attendancereportService } from 'src/app/services/attendancereport.service';
import { map } from 'rxjs';
@Component({
  selector: 'app-attendancereport',
  templateUrl: './attendancereport.component.html',
  styleUrls: ['./attendancereport.component.scss']
})
export class AttendanceReportComponent {
    AttendanceReport: AttendanceReport[];
    attendancereport: AttendanceReport = {
      Year: '',
      Month: '',
      NumberOfDays: '',
      PresentDate: '',
    };
    selectedProducts: AttendanceReport[];
    cols: any[];
    display = false;
    sibebarHeader = 'Add AttendanceReport';
    selectedKey = '';
  
    constructor(public attendancereportservice: attendancereportService) {}
  
    ngOnInit(): void {
      this.cols = [
        { field: 'Year', header: 'year', customExportHeader: 'YEAR' },
        { field: 'Month', header: 'month' },
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
      )
      .subscribe((data) => {
        this.AttendanceReport= data;
      });
  }
  create() {
    if (this.sibebarHeader == 'Edit Attendance') {
      this.attendancereportservice
        .update(this.selectedKey, this.attendancereport)
        .then(() => {
          console.log('Updated job successfully!');
          this.display = false;
          this.attendancereport = {
            Year: '',
            Month: '',
            NumberOfDays: '',
            PresentDate: '',
          };
        });
    } else {
        this.attendancereportservice.create(this.attendancereport).then(() => {
          console.log('Created new item successfully!');
          this.display = false;
          this.attendancereport = {
            Year: '',
            Month: '',
            NumberOfDays: '',
            PresentDate: '',
          };
        });
      }
    }
    AddAttendanceReport() {
      this.display = true;
      this.sibebarHeader = 'Add Attendance';
    }
    edit(key: string, attendancereport: AttendanceReport) {
      this.display = true;
      this.sibebarHeader = 'Edit Attendance';
      this.attendancereport = attendancereport;
      this.selectedKey = key;
    }
    delete(key: any) {
      this.attendancereportservice.delete(key);
    }
  
}
