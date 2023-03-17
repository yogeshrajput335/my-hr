import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Job } from 'src/app/models/job';
import { jobService } from 'src/app/services/job.service';
import {MenuItem} from 'primeng/api';
declare var dataTableInit: any;

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {
  es: any;
  value: Date;
  date2: Date;
  Jobs: Job[];
  cols: any[];
  job:Job = {name:'',desc:'',startdate:'',enddate:''};
  selectedProducts: Job[];
  display = false;
  sibebarHeader = "Add Job";
  selectedKey=''
  jobService: any;
  
  constructor(
    private jobservice: jobService
    ) {}
    confirm() {
      this.jobService.confirm({
          message: 'Are you sure that you want to perform this action?',
          accept: () => {
              //Actual logic to perform a confirmation
          }
      });
  }

  ngOnInit():void {
    this.cols = [
      { field: 'name', header: 'name', customExportHeader: 'NAME' },
      { field: 'desc', header: 'desc' },
      { field: 'startdate', header: 'startdate' },
      { field: 'enddate', header: 'enddate' }
  ];


    this.jobservice.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.Jobs = data;
    });
}
  create() {   
    if(this.sibebarHeader == 'Edit Job'){
      this.jobservice.update(this.selectedKey,this.job).then(() => {
        console.log('Updated job successfully!');
        this.display = false;
        this.job = {name:'',desc:'',startdate:'',enddate:''}
      });
    }
    else{
      this.jobservice.create(this.job).then(() => {
        console.log('Created new job successfully!');
        this.display = false;
        this.job = {name:'',desc:'',startdate:'',enddate:''}
      });
    }
  }
  delete(key:any){
    this.jobservice.delete(key);
    message: 'Are you sure that you want to perform this action?'
  }
  AddJob(){
    this.display = true;
    this.sibebarHeader = 'Add Job'
  }
  edit(key:string,job:Job){
    this.display = true;
    this.sibebarHeader = 'Edit Job'
    this.job = job;
    this.selectedKey = key;
  }


}


let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();