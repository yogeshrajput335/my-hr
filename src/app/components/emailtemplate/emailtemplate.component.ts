import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { EmailTemplate } from 'src/app/models/emailtemplate';
import { emailtemplateService } from 'src/app/services/emailtemplate.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
declare var dataTableInit: any;

@Component({
  selector: 'app-emailtemplate',
  templateUrl: './emailtemplate.component.html',
  styleUrls: ['./emailtemplate.component.scss'],
})

export class EmailTemplateComponent implements OnInit {
  EmailTemplate: EmailTemplate[];
  cols: any[];
  emailtemplate:EmailTemplate = {name:'',description:'',createdby:'',createddate:''};
  selectedProducts: EmailTemplate[];
  display = false;
  sibebarHeader = "Add EmailTemplate";
  selectedKey=''
  emailTemplateService: any;
  constructor(
    private emailtemplateservice: emailtemplateService,
    private messageService: MessageService,
    private confirmationService:ConfirmationService
    ) {}

  ngOnInit():void {
    this.cols = [
      { field: 'name', header: 'name', customExportHeader: 'NAME' },
      { field: 'description', header: 'description' },
      { field: 'createdBy', header: 'createdBy' },
      { field: 'createddate', header: 'Createddate' }
  ];
    this.emailtemplateservice.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.EmailTemplate = data;
    });
}
  create() {   
    if(this.sibebarHeader == 'Edit EmailTemplate'){
      this.emailtemplateservice.update(this.selectedKey,this.emailtemplate).then(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail:'EmailTemplate is edited succcessfully' });
        this.display = false;
        this.emailtemplate = {name:'',description:'',createdby:'',createddate:''}
      });
    }
    else{
      this.emailtemplateservice.create(this.emailtemplate).then(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Created new EmailTemplate succcessfully' });
        this.display = false;
        this.emailtemplate = {name:'',description:'',createdby:'',createddate:''}
      });
    }
  }
  delete(key:any){
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.emailtemplateservice.delete(key);
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
  AddEmailTemplate(){
    this.display = true;
    this.sibebarHeader = 'Add EmailTemplate'
  }
  edit(key:string,emailtemplate:EmailTemplate){
    this.display = true;
    this.sibebarHeader = 'Edit EmailTemplate'
    this.emailtemplate = emailtemplate;
    this.selectedKey = key;
  }
  sidenavjobClosed(){
    this.emailtemplate = {name:'',description:'',createdby:'',createddate:''}
  }
}


