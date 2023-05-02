import { Component,OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { Leave } from 'src/app/models/leave';
import { LeaveType } from 'src/app/models/leavetype';
import { employeeService } from 'src/app/services/employee.service';
import { leaveService } from 'src/app/services/leave.service';
import { leavetypeService } from 'src/app/services/leavetype.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
declare var dataTableInit:any;

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {
  Employee: Employee[];
  LeaveType: LeaveType[];
  date: Date;
  value: Date;
  Leave:Leave[];
  leave:Leave={Employee:'',FromDate:new Date(),ToDate:new Date(),LeaveType:'', AppliedDate:'',Status:'',Reason:''}
  selectedProducts: Leave[];
  cols: any[];
  display = false;
  sibebarHeader = "Add Leave";
  selectedKey=''
  userDetails : any;
  constructor(
    public leaveservice:leaveService,
    public employeeservice:employeeService,
    public leavetypeservice:leavetypeService,
    private messageService: MessageService,
    private confirmationService:ConfirmationService
  ){ }
    ngOnInit():void {
      this.userDetails = JSON.parse(localStorage.getItem('user')!)
      this.leavetypeservice.getAll().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.LeaveType = data;
      });
      this.cols = [
        { field: 'Employee', header: 'Employee', customExportHeader: 'EMPLOYEE' },
        { field: 'FromDate', header: 'FromDate' },
        { field: 'ToDate', header: 'ToDate' },
        { field: 'LeaveType', header: 'LeaveType' },
        { field: 'AppliedDate', header: 'AppliedDate' },
        { field: 'Status', header: 'Status' },
        { field: 'Reason', header: 'Reason' },
      ];
      this.leaveservice.getAll().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe((data:any) => {
        this.Leave = data.filter((x:any)=>x.Employee == this.userDetails.name);
      });
    }
    create() {  
      this.leave.Employee = this.userDetails.name;
      this.leave.AppliedDate = new Date().toLocaleDateString();
      this.leave.Status = 'NEW';
      this.leave.FromDate = this.leave.FromDate.toLocaleDateString();
      this.leave.ToDate = this.leave.ToDate.toLocaleDateString();
      if(this.sibebarHeader == 'Edit Leave'){
        this.leaveservice.update(this.selectedKey,this.leave).then(() => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail:'leave is edited succcessfully' });
          this.display = false;
          this.leave = { Employee:'',FromDate:new Date(),ToDate:new Date(),LeaveType:'', AppliedDate:'',Status:'',Reason:''}
        });
      }
      else{
      this.leaveservice.create(this.leave).then(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail:'leave is created succcessfully' });
        this.display = false;
        this.leave = { Employee:'',FromDate:new Date(),ToDate:new Date(),LeaveType:'', AppliedDate:'',Status:'',Reason:''}
      });
    }
    }
    AddLeave(){
      this.display = true;
      this.sibebarHeader = 'Add Leave'
    }
    edit(key:string,leave:Leave){
      this.display = true;
      this.sibebarHeader = 'Edit Leave'
      this.leave = leave;
      this.selectedKey = key;
  
    }
    delete(key:any){
      this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.leaveservice.delete(key);
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
      this.leave = { Employee:'',FromDate:new Date(),ToDate:new Date(),LeaveType:'', AppliedDate:'',Status:'',Reason:''}
    }
}
