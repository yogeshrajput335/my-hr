import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ClientEmployeeDetails } from 'src/app/models/clientemployeedetails';
import { clientemployeedetailsService } from 'src/app/services/clientemployeedetails.service';
declare var dataTableInit:any;

@Component({
  selector: 'app-clientemployeedetails',
  templateUrl: './clientemployeedetails.component.html',
  styleUrls: ['./clientemployeedetails.component.scss']
})

export class ClientEmployeeDetailsComponent  implements OnInit{
    ClientEmployeeDetails: ClientEmployeeDetails[];
    clientemployeedetails:ClientEmployeeDetails = {ClientId:'',EmployeeId:'',StartDate:'',EndDate:'',JobDetails:'',PerHourCost:''};
    selectedProducts: ClientEmployeeDetails[];
    cols: any[];
    display = false;
    sibebarHeader = "Add ClientEmployeeDetails";
    selectedKey=''
  
    constructor(
      public clientemployeedetailsservice: clientemployeedetailsService
    ){ }

    ngOnInit():void {
        this.cols = [
          { field: 'ClientId', header: 'clientID', customExportHeader: 'CLIENTID' },
          { field: 'EmployeeId', header: 'EmployeeId' },
          { field: 'StartDate', header: 'startDate' },
          { field: 'EndDate', header: 'endDate' },
          { field: 'JobDetails', header: 'jobdetails' },
          { field: 'PerHourCost', header: 'perhourcost' },
        ];
  
      this.clientemployeedetailsservice.getAll().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.ClientEmployeeDetails = data;
      });
    }
    create() {   
        if(this.sibebarHeader == 'Edit ClientEmployeeDetails'){
          this.clientemployeedetailsservice.update(this.selectedKey,this.clientemployeedetails).then(() => {
            console.log('Updated job successfully!');
            this.display = false;
            this.clientemployeedetails = { ClientId:'',EmployeeId:'',StartDate:'',EndDate:'',JobDetails:'',PerHourCost:''}
          });
        }
        else{
        this.clientemployeedetailsservice.create(this.clientemployeedetails).then(() => {
          console.log('Created new item successfully!');
          this.display = false;
          this.clientemployeedetails = {ClientId:'',EmployeeId:'',StartDate:'',EndDate:'',JobDetails:'',PerHourCost:''}
        });
      }
      }
      AddClientEmployeeDetails(){
        this.display = true;
        this.sibebarHeader = 'Add ClientEmployeeDetails'
      }
      edit(key:string,clientemployeedetails:ClientEmployeeDetails){
        this.display = true;
        this.sibebarHeader = 'Edit ClientEmployeeDetails'
        this.clientemployeedetails = clientemployeedetails;
        this.selectedKey = key;
    
      }
      delete(key:any){
        this.clientemployeedetailsservice.delete(key);
      }    
}
