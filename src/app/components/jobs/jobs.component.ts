import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Job } from 'src/app/models/job';
import { jobService } from 'src/app/services/job.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
declare var dataTableInit: any;
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {
  Jobs: Job[];
  cols: any[];
  job:Job = {name:'',description:'',startdate:'',enddate:''};
  selectedProducts: Job[];
  display = false;
  sibebarHeader = "Add Job";
  selectedKey=''
  jobService: any;
  constructor(
    private jobservice: jobService,
    private messageService: MessageService,
    private confirmationService:ConfirmationService
    ) {}
  ngOnInit():void {
    this.cols = [
      { field: 'name', header: 'name', customExportHeader: 'NAME' },
      { field: 'description', header: 'description' },
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
        this.messageService.add({ severity: 'success', summary: 'Success', detail:'Job is edited succcessfully' });
        this.display = false;
        this.job = {name:'',description:'',startdate:'',enddate:''}
      });
    }
    else{
      this.jobservice.create(this.job).then(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Created new Job succcessfully' });
        this.display = false;
        this.job = {name:'',description:'',startdate:'',enddate:''}
      });
    }
  }
  delete(key:any){
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.jobservice.delete(key);
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
  sidenavjobClosed(){
    this.job = {name:'',description:'',startdate:'',enddate:''}
  }
}


