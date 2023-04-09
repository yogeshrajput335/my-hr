import { Component,OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { Leave } from 'src/app/models/leave';
import { LeaveType } from 'src/app/models/leavetype';
import { employeeService } from 'src/app/services/employee.service';
import { leaveService } from 'src/app/services/leave.service';
import { leavetypeService } from 'src/app/services/leavetype.service';

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
    public leavetypeservice:leavetypeService
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
          console.log('Updated job successfully!');
          this.display = false;
          this.leave = { Employee:'',FromDate:new Date(),ToDate:new Date(),LeaveType:'', AppliedDate:'',Status:'',Reason:''}
        });
      }
      else{
      this.leaveservice.create(this.leave).then(() => {
        console.log('Created new item successfully!');
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
      this.leaveservice.delete(key);
    }

}
