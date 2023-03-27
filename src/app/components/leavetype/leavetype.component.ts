import { Component,OnInit } from '@angular/core';
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
      public leavetypeservice: leavetypeService
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
              console.log('Updated job successfully!');
              this.display = false;
              this.leavetype = {Type:''}
            });
          }
          else{
            this.leavetypeservice.create(this.leavetype).then(() => {
              console.log('Created new item successfully!');
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
            this.leavetypeservice.delete(key);
          }
}
