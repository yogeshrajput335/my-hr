import { Component,OnInit } from '@angular/core';
import { ConfirmEventType,ConfirmationService, MessageService } from 'primeng/api';
import { map } from 'rxjs';
import { LeaveType } from 'src/app/models/leavetype';
import { leavetypeService } from 'src/app/services/leavetype.service';
declare var dataTableInit:any; 

@Component({
  selector: 'app-leavetype',
  templateUrl: './leavetype.component.html',
  styleUrls: ['./leavetype.component.scss']
})
export class LeaveTypeComponent  implements OnInit{
    LeaveType: LeaveType[];
    leavetype:LeaveType = {Type:''};
    selectedProducts: LeaveType[];
    cols: any[];
    display = false;
    sibebarHeader = "Add LeaveType";
    selectedKey=''

    constructor(
      public leavetypeservice: leavetypeService,
      private messageService: MessageService,
      private confirmationService:ConfirmationService
    ){ }

      ngOnInit():void {
        this.cols = [
          { field: 'type', header: 'type', customExportHeader: 'TYPE' },
        ];
        this.leavetypeservice.getAll().snapshotChanges().pipe(
            map(changes =>
              changes.map(c =>
                ({ key: c.payload.key, ...c.payload.val() })
              )
            )
          ).subscribe(data => {
            this.LeaveType = data;
          });
        }
        create() {   
          if(this.sibebarHeader == 'Edit LeaveType'){
            this.leavetypeservice.update(this.selectedKey,this.leavetype).then(() => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail:'Leavetype is edited succcessfully' });
              this.display = false;
              this.leavetype = {Type:''}
            });
          }
          else{
            this.leavetypeservice.create(this.leavetype).then(() => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail:'Leavetype is created succcessfully' });
              this.display = false;
              this.leavetype = {Type:''}
            });
          }
          }
          AddLeaveType(){
            this.display = true;
            this.sibebarHeader = 'Add LeaveType'
          }
          edit(key:string,leavetype:LeaveType){
            this.display = true;
            this.sibebarHeader = 'Edit LeaveType'
            this.leavetype = leavetype;
            this.selectedKey = key;
        
          }
          delete(key:any){
            this.confirmationService.confirm({
              message: 'Do you want to delete this record?',
              header: 'Delete Confirmation',
              icon: 'pi pi-info-circle',
              accept: () => {
                this.leavetypeservice.delete(key);
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
            this.leavetype = {Type:''}
          }
}
