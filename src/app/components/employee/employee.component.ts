import { Component,OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { employeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})

export class EmployeeComponent implements OnInit{
  Employee: Employee[];
  employee:Employee = {EmployeeType:'',EmployeeName:'',Phone:'',DateOfBirth:'', PersonalEmail:'',CompanyEmail:'',ReportingManager:''};
  selectedProducts: Employee[];
  cols: any[];
  display = false;
  sibebarHeader = "Add Employee";
  selectedKey=''

  constructor(
    public employeeservice:employeeService
  ){ }

  ngOnInit():void {
    this.cols = [
      { field: 'EmployeeType',    header: 'employeeType', customExportHeader: 'EMPLOYEETYPE' },
      { field: 'EmployeeName',    header: 'employeeName' },
      { field: 'Phone',           header: 'phone'},
      { field: 'DateOfBirth',     header: 'dateofbirth' },
      { field: 'PersonalEmail',   header: 'personalemail' },
      { field: 'CompanyEmail',    header: 'companyemail' },
      { field: 'ReportingManager', header: 'reportingmanager' },
    ];

  this.employeeservice.getAll().snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe(data => {
    this.Employee = data;
  });
}
create() {   
    if(this.sibebarHeader == 'Edit Employee'){
      this.employeeservice.update(this.selectedKey,this.employee).then(() => {
        console.log('Updated job successfully!');
        this.display = false;
        this.employee = { EmployeeType:'',EmployeeName:'',Phone:'',DateOfBirth:'', PersonalEmail:'',CompanyEmail:'',ReportingManager:''}
      });
    }
    else{
    this.employeeservice.create(this.employee).then(() => {
      console.log('Created new item successfully!');
      this.display = false;
      this.employee = { EmployeeType:'',EmployeeName:'',Phone:'',DateOfBirth:'', PersonalEmail:'',CompanyEmail:'',ReportingManager:''}
    });
  }
  }
  AddEmployee(){
    this.display = true;
    this.sibebarHeader = 'Add Employee'
  }
  edit(key:string,employee:Employee){
    this.display = true;
    this.sibebarHeader = 'Edit Employee'
    this.employee = employee;
    this.selectedKey = key;
}
  delete(key:any){
    this.employeeservice.delete(key);
  }
}
