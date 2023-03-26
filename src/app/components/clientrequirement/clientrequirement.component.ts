import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Client } from 'src/app/models/client';
import { ClientRequirement } from 'src/app/models/clientrequirement';
import { clientService } from 'src/app/services/client.service';
import { clientrequirementService } from 'src/app/services/clientrequirement.service';
declare var dataTableInit:any;

@Component({
  selector: 'app-clientrequirement',
  templateUrl: './clientrequirement.component.html',
  styleUrls: ['./clientrequirement.component.scss']
})
export class ClientRequirementComponent implements OnInit{
  Client: Client[];
  ClientRequirement: ClientRequirement[];
  clientrequirement:ClientRequirement = {ClientId:'',RequirementHeading:'',RequirementDescription:'',RequirementDate:'',EndDate:'',RequirementBy:''};
  selectedProducts: ClientRequirement[];
  cols: any[];
  display = false;
  sibebarHeader = "AddClientRequirement";
  selectedKey=''
  constructor(
    public clientrequirementservice:clientrequirementService,
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
        { field: 'ClientId', header: 'ClientId', customExportHeader: 'CLIENTID' },
        { field: 'RequirementDescription', header: 'RequirementDescription' },
        { field: 'RequirementHeading', header: 'RequirementHeading' },
        { field: 'RequirementDate', header: 'RequirementDate' },
        { field: 'EndDate', header: 'EndDate' },
        { field: 'RequirementBy', header: 'RequirementBy' },
    ];
      this.clientrequirementservice.getAll().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.ClientRequirement = data;
      });
    }  
    create() {   
        if(this.sibebarHeader == 'EditClientRequirement'){
          this.clientrequirementservice.update(this.selectedKey,this.clientrequirement).then(() => {
            console.log('Updated job successfully!');
            this.display = false;
            this.clientrequirement = {ClientId:'',RequirementHeading:'',RequirementDescription:'',RequirementDate:'',EndDate:'',RequirementBy:'' }
          });
        }
        else{
        this.clientrequirementservice.create(this.clientrequirement).then(() => {
          console.log('Created new item successfully!');
          this.display = false;
          this.clientrequirement = {ClientId:'',RequirementHeading:'',RequirementDescription:'',RequirementDate:'',EndDate:'',RequirementBy:''}
        });
      }
      }
      AddClientRequirement(){
        this.display = true;
        this.sibebarHeader = 'AddClientRequirement'
      }
      edit(key:string,clientrequirement:ClientRequirement){
        this.display = true;
        this.sibebarHeader = 'EditClientRequirement'
        this.clientrequirement = clientrequirement;
        this.selectedKey = key;
      }
      delete(key:any){
        this.clientrequirementservice.delete(key);
      }
}
