import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { clientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import { ColumnFilterFormElement } from 'primeng/table';
import { ClientFollowUp } from 'src/app/models/clientfollowup';
import { SnapshotAction } from '@angular/fire/compat/database';
import { MessageService } from 'primeng/api';
declare var dataTableInit: any;
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit{
    Client: Client[];
    cols: any[];
    client:Client = {ClientName:'',Phone:'',Email:'',Address:''};
    selectedProducts: ColumnFilterFormElement[];
    display = false;
    sibebarHeader = "Add Client";
    selectedKey=''
    clientService: any;
    description ="";
    userDetails:any;
    followUps:any;
    requirements:any;
    contactperson:any;
    displayFollowUp = false;  
    displayRequirement=false;
    displayContactPerson=false;
    initfollowUps:any;
    initrequirements:any;
    initcontactperson:any;
    requirementHeading:"";
    requirementDate:"";
    requirementBy:"";
    phone:"";
    email:"";
    contactpersonname:"";

      constructor(private clientservice:clientService,
        private messageService: MessageService
      ) {}

        ngOnInit():void {
          this.userDetails = JSON.parse(localStorage.getItem('user')!)
            this.cols = [
              { field: 'ClientName', header: 'ClientName', customExportHeader: 'CLIENTNAME' },
              { field: 'Phone', header: 'Phone' },
              { field: 'Email', header: 'Email' },
              { field: 'Address', header: 'Address' },
          ];
           this.clientservice.getAll().snapshotChanges().pipe(
              map(changes =>
                changes.map(c =>
                  ({ key: c.payload.key, ...c.payload.val() })
                )
              )
            ).subscribe(data => {
              this.Client = data;
            });
            this.clientservice.getclientFollowUps().snapshotChanges().pipe(
              map(changes =>
                changes.map(c =>
                  ({ key: c.payload.key, ...c.payload.val() })
                )
              )
            ).subscribe(data => {
              this.initfollowUps = data;
            });
            this.clientservice.getAllRequirements().snapshotChanges().pipe(
              map((changes:any) =>
                changes.map((c:any) =>
                  ({ key: c.payload.key, ...c.payload.val() })
                )
              )
            ).subscribe((data:any) => {
              this.initrequirements = data;
            });
            this.clientservice.getAllContactPerson().snapshotChanges().pipe(
              map((changes:any) =>
                changes.map((c:any) =>
                  ({ key: c.payload.key, ...c.payload.val() })
                )
              )
            ).subscribe((data:any) => {
              this.initcontactperson = data;
            });
        }
        create() {   
            if(this.sibebarHeader == 'Edit Client'){
              this.clientservice.update(this.selectedKey,this.client).then(() => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Client is edited succcessfully' });
                this.display = false;
                this.client = {ClientName:'',Phone:'',Email:'',Address:''}
              });
            }
            else{
              this.clientservice.create(this.client).then(() => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Client is created succcessfully' });
                this.display = false;
                this.client = {ClientName:'',Phone:'',Email:'',Address:''}
              });
            }
          }
          AddClient(){
            this.display = true;
            this.sibebarHeader = 'Add Client'
          }
          edit(key:string,client:Client){
            this.display = true;
            this.sibebarHeader = 'Edit Client'
            this.client = client;
            this.selectedKey = key;
          }
          selKey:any;
          selClient:any;
          openfollowups(key:any,ClientName:any){
            this.selKey = key;
            this.selClient = ClientName; 
            this.displayFollowUp = true;
            this.followUps = this.initfollowUps.filter((x:any)=>x.clientKey == this.selKey);
          }
          createFollowup(){
            this.clientservice.createFollowUp({clientKey:this.selKey,followupBy:this.userDetails.name,followupDate:new Date().toLocaleString(),description:this.description}).then(() => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Created new client succcessfully' });
              this.displayFollowUp=false;
              this.description='';
              this.clientservice.getclientFollowUps().snapshotChanges().pipe(
                map(changes =>
                  changes.map(c =>
                    ({ key: c.payload.key, ...c.payload.val() })
                  )
                )
              ).subscribe(data => {
                this.initfollowUps = data;
                this.followUps = this.initfollowUps.filter((x:any)=>x.clientKey == this.selKey);
              });
             });
          }
          openrequirements(key:any,ClientName:any){
            this.selKey = key;
            this.selClient = ClientName; 
            this.displayRequirement = true;
            this.requirements = this.initrequirements.filter((x:any)=>x.clientKey == this.selKey);
          }
          createRequirements(){
            this.clientservice.createRequirement({clientKey:this.selKey, requirementHeading:this.requirementHeading,requirementDate:new Date().toLocaleString(),requirementBy:this.requirementBy,description:this.description}).then(() => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Created new client succcessfully' });
              this.displayRequirement=false;
              this.description=''
              this.requirementHeading =''
              this.requirementBy =''
              this.clientservice.getAllRequirements().snapshotChanges().pipe(
                map((changes:any) =>
                  changes.map((c:any) =>
                    ({ key: c.payload.key, ...c.payload.val() })
                  )
                )
              ).subscribe((data:any) => {
                this.initrequirements = data;
                this.requirements = this.initrequirements.filter((x:any)=>x.clientKey == this.selKey);
              });
            });
          }
          opencontactperson(key:any,ClientName:any){
            this.selKey = key;
            this.selClient = ClientName; 
            this.displayContactPerson = true;
            this.contactperson = this.contactperson.filter((x:any)=>x.clientKey == this.selKey);
          }
          createContactPerson(){
            this.clientservice.createContactPerson({clientKey:this.selKey,contactpersonname:this.contactpersonname,phone:this.phone,email:this.email}).then(() => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Created new client succcessfully' });
              this.display=false;
              this.contactpersonname=''
              this.phone=''
              this.email=''
              this.clientservice.getAllContactPerson().snapshotChanges().pipe(
                map((changes:any) =>
                  changes.map((c:any) =>
                    ({ key: c.payload.key, ...c.payload.val() })
                  )
                )
              ).subscribe((data:any) => {
                this.initcontactperson = data;
                this.contactperson = this.initcontactperson.filter((x:any)=>x.clientKey == this.selKey);
              });
            });
          }
          sidenavClosed(){
            this.client = {ClientName:'',Phone:'',Email:'',Address:''}
          }
}
