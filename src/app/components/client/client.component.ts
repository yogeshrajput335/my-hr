import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { clientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import { ColumnFilterFormElement } from 'primeng/table';
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
    displayFollowUp = false;  
    initfollowUps:any
   
    constructor(
        private clientservice:clientService
        ) {}
        ngOnInit():void {
          this.userDetails = JSON.parse(localStorage.getItem('user')!)
            this.cols = [
              { field: 'ClientName', header: 'ClientName', customExportHeader: 'CLIENTNAME' },
              { field: 'Phone', header: 'Phone' },
              { field: 'Email', header: 'Email' },
              { field: 'Address', header: 'Address' }
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
            this.clientservice.getAllFollowUps().snapshotChanges().pipe(
              map(changes =>
                changes.map(c =>
                  ({ key: c.payload.key, ...c.payload.val() })
                )
              )
            ).subscribe(data => {
              this.initfollowUps = data;
            });
        }
        create() {   
            if(this.sibebarHeader == 'Edit Client'){
              this.clientservice.update(this.selectedKey,this.client).then(() => {
                console.log('Updated job successfully!');
                this.display = false;
                this.client = {ClientName:'',Phone:'',Email:'',Address:''}
              });
            }
            else{
              this.clientservice.create(this.client).then(() => {
                console.log('Created new job successfully!');
                this.display = false;
                this.client = {ClientName:'',Phone:'',Email:'',Address:''}
              });
            }
          }
          delete(key:any){
            this.clientservice.delete(key);
            message: 'Are you sure that you want to perform this action?'
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
              console.log('Created new item successfully!');
              this.display=false;
              this.description=''
              this.clientService.getAllFollowUps().snapshotChanges().pipe(
                map((changes:any) =>
                  changes.map((c:any) =>
                    ({ key: c.payload.key, ...c.payload.val() })
                  )
                )
              ).subscribe((data:any) => {
                this.initfollowUps = data;
                this.followUps = this.initfollowUps.filter((x:any)=>x.clientKey == this.selKey);
              });
            });
          }
}
