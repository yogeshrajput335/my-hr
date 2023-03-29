import { Component,OnInit } from '@angular/core';
import { map } from 'rxjs';
import { LeaveList } from 'src/app/models/leavelist';
import { LeaveType } from 'src/app/models/leavetype';
import { leavelistService } from 'src/app/services/leavelist.service';
import { leavetypeService } from 'src/app/services/leavetype.service';
declare var dataTableInit:any; 

@Component({
  selector: 'app-leavelist',
  templateUrl: './leavelist.component.html',
  styleUrls: ['./leavelist.component.scss']
})
export class LeaveListComponent  implements OnInit{
    LeaveList: LeaveList[];
    leavelist:LeaveList = {Type:''};
    selectedProducts: LeaveList[];
    cols: any[];
    display = false;
    sibebarHeader = "Add LeaveList";
    selectedKey=''
  
    constructor(
      public leavelistservice: leavelistService
    ){ }
  
      ngOnInit():void {
        this.cols = [
          { field: 'type', header: 'type', customExportHeader: 'TYPE' },
        ];
        this.leavelistservice.getAll().snapshotChanges().pipe(
            map(changes =>
              changes.map(c =>
                ({ key: c.payload.key, ...c.payload.val() })
              )
            )
          ).subscribe(data => {
            this.LeaveList = data;
          });
        }
        create() {   
          if(this.sibebarHeader == 'Edit LeaveList'){
            this.leavelistservice.update(this.selectedKey,this.leavelist).then(() => {
              console.log('Updated job successfully!');
              this.display = false;
              this.leavelist= {Type:''}
            });
          }
          else{
            this.leavelistservice.create(this.leavelist).then(() => {
              console.log('Created new item successfully!');
              this.display = false;
              this.leavelist = {Type:''}
            });
          }
          }
          AddLeaveType(){
            this.display = true;
            this.sibebarHeader = 'Add LeaveList'
          }
          edit(key:string,leavelist:LeaveList){
            this.display = true;
            this.sibebarHeader = 'Edit LeaveList'
            this.leavelist = leavelist;
            this.selectedKey = key;
        
          }
          delete(key:any){
            this.leavelistservice.delete(key);
          }
}
