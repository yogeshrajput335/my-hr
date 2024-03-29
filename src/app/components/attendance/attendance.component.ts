import { Component, OnInit } from '@angular/core';
import { Attendance } from 'src/app/models/attendance';
import { attendanceService } from 'src/app/services/attendance.service';
import { AttendanceReport } from 'src/app/models/attendancereport';
import { map } from 'rxjs';
import { attendancereportService } from 'src/app/services/attendancereport.service';
import { employeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
declare var dataTableInit:any;

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})

export class AttendanceComponent implements OnInit {
  Employee: Employee[];
  Attendance: Attendance[];
  AttendanceReport:AttendanceReport[];
  attendance: Attendance = {
    Employee:'',
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
   
  constructor(
    public attendanceservice: attendanceService,
    public attendancereportservice: attendancereportService,
    public employeeservice:employeeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.userDetails=JSON.parse(localStorage.getItem('user')!)
    this.attendancereportservice
    .getAll()
    .snapshotChanges()
    .pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe((data:any)=> {
      this.AttendanceReport= data;
    });

    this.employeeservice.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe((data:any) => {
      this.Employee = data;
    });

    this.cols = [
      { field: 'Employee', header: 'Employee', customExportHeader: 'EMPLOYEE' },
      { field: 'Year', header: 'Year'},
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
        this.Attendance = data.filter((x:any)=>x.Employee ==this.userDetails.name);
        this.Attendance=data;
      });
  }

  create() {
    this.attendance.Employee = this.userDetails.name;
    this.attendance.Year=this.attendance.Year.toLocaleDateString();
    this.attendance.Month=this.attendance.Month.toLocaleDateString();
    this.attendance.Status='NEW';
    this.attendance.NumberOfDays = '12';
    this.attendance.PresentDate=this.attendance.PresentDate.toLocaleDateString();
    if (this.sibebarHeader == 'Edit Attendance') {
      this.attendanceservice
        .update(this.selectedKey, this.attendance)
        .then(() => {
           this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Attendance is edited succcessfully' });
         
          this.display = false;
          this.attendance = {
            Employee:'',
            Year: '',
            Month: '',
            NumberOfDays:'',
            PresentDate: new Date()
          };
        });
    } else {
      this.attendanceservice.create(this.attendance).then(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Attendance is  created succcessfully' });
        this.display = false;
        this.attendance = {
          Employee:'',
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
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.attendanceservice.delete(key);
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: (type) => {
          switch (type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                  break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                  break;
          }
        }
      });    
  }
  sidenavClosed(){
    this.attendance = {
      Employee:'',
      Year: '',
      Month: '',
      NumberOfDays: '',
      PresentDate: new Date()
    };
  }
}
