import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Client } from 'src/app/models/client';
import { ClientFollowUp } from 'src/app/models/clientfollowup';
import { clientService } from 'src/app/services/client.service';
import { clientfollowupService } from 'src/app/services/clientfollowup.service';
declare var dataTableInit: any;

@Component({
  selector: 'app-clientfollowup',
  templateUrl: './clientfollowup.component.html',
  styleUrls: ['./clientfollowup.component.scss']
})

export class ClientFollowUpComponent  implements OnInit{
display = false;  
cols:any;
Client: Client[];
selectedProducts:ClientFollowUp[];
sibebarHeader = "Add ClientFollowUp";
selectedKey=''
clientfollowup:ClientFollowUp = {ClientId: '', FollowUpDate: '', NextFollowUpDate: '', MinuteOfMeetings: ''};
ClientFollowUp:ClientFollowUp[];
  constructor(
    public clientfollowupservice:clientfollowupService,
    private clientservice:clientService
  ){ }
  ngOnInit():void {
    this.clientservice.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.Client = data;
    });
    this.cols = [
      { field: 'ClientId', header: 'ClientId', customExportHeader: 'CLIENT ID' },
      { field: 'FollowUpDate', header: 'followupdate' },
      { field: 'NextFollowUpDate', header: 'NextFollowUpDate' },
      { field: 'MinuteOfMeetings', header: 'MinuteOfMeetings' },
   ];
   this.clientfollowupservice.getAll().snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe(data => {
    this.ClientFollowUp = data;
  });
  }
  create() {   
    if(this.sibebarHeader == 'Edit clientfollowup'){
      this.clientfollowupservice.update(this.selectedKey,this.ClientFollowUp).then(() => {
        console.log('Updated job successfully!');
        this.display = false;
        this.clientfollowup = { ClientId:'',FollowUpDate:'',NextFollowUpDate:'',MinuteOfMeetings:''}
      });
    }
    else{
    this.clientfollowupservice.create(this.clientfollowup).then(() => {
      console.log('Created new item successfully!');
      this.display=false;
      this.clientfollowup={ ClientId:'',FollowUpDate:'',NextFollowUpDate:'',MinuteOfMeetings:'' }
    });
    }

  }
  AddClientFollowUp(){
    this.display = true;
    this.sibebarHeader = 'Add ClientFollowUp'
  }
  edit(key:string,clientfollowup:ClientFollowUp){
    this.display = true;
    this.sibebarHeader = 'Edit ClientFollowUp'
    this.clientfollowup = clientfollowup;
    this.selectedKey = key;
  }
  delete(key:any){
    this.clientfollowupservice.delete(key);
  } 
}
