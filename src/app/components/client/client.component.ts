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
export class ClientComponent {
    Client: Client[];
    cols: any[];
    client:Client = {ClientName:'',Phone:'',Email:'',Address:''};
    selectedProducts: ColumnFilterFormElement[];
    display = false;
    sibebarHeader = "Add Client";
    selectedKey=''
    clientService: any;

    constructor(
        private clientservice:clientService
        ) {}
        ngOnInit():void {
            this.cols = [
              { field: 'ClientName', header: 'ClientName', customExportHeader: 'ClientNAME' },
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
}
