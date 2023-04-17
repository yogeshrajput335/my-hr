import { Component,OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Leave } from '../models/leave';
import { leaveService } from '../services/leave.service';
import { employeeService } from '../services/employee.service';
import { Employee } from '../models/employee';
import { leavetypeService } from '../services/leavetype.service';
import { LeaveType } from '../models/leavetype';
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
  leave:Leave={Employee:'',FromDate:'',ToDate:'',LeaveType:'', AppliedDate:'',Status:'',Reason:''}
  selectedProducts: Leave[];
  cols: any[];
  display = false;
  sibebarHeader = "Add Leave";
  selectedKey=''
  constructor(
    public leaveservice:leaveService,
    public employeeservice:employeeService,
    public leavetypeservice:leavetypeService
  ){ }
  ngOnInit():void {
      this.employeeservice.getAll().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.Employee = data;
      });
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
      ).subscribe(data => {
        this.Leave = data;
      });
    }
    create() {   
      if(this.sibebarHeader == 'Edit Leave'){
        this.leaveservice.update(this.selectedKey,this.leave).then(() => {
          console.log('Updated job successfully!');
          this.display = false;
          this.leave = { Employee:'',FromDate:'',ToDate:'',LeaveType:'', AppliedDate:'',Status:'',Reason:''}
        });
      }
      else{
      this.leaveservice.create(this.leave).then(() => {
        console.log('Created new item successfully!');
        this.display = false;
        this.leave = { Employee:'',FromDate:'',ToDate:'',LeaveType:'', AppliedDate:'',Status:'',Reason:''}
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
      this.leaveservice.delete(key);
    }
}
