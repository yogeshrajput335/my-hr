import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ClientContactPerson } from 'src/app/models/clientcontactperson';
import { clientcontactpersonService } from 'src/app/services/clientcontactperson.service';
declare var dataTableInit:any;

@Component({
  selector: 'app-clientcontactperson',
  templateUrl: './clientcontactperson.component.html',
  styleUrls: ['./clientcontactperson.component.scss']
})
export class ClientContactPersonComponent implements OnInit {
  ClientContactPerson: ClientContactPerson[];
  clientcontactperson:ClientContactPerson = {ClientId:'',ContactPersonName:'',Phone:'',Email:''};
  selectedProducts:ClientContactPerson[];
  cols: any[];
  display = false;
  sibebarHeader = "Add ClientContactPerson";
  selectedKey=''
  constructor(
    public clientcontactpersonservice:clientcontactpersonService
  ){ }
  ngOnInit():void {
    this.cols = [
      { field: 'ClientId', header: 'ClientId', customExportHeader: 'CLIENTID' },
      { field: 'contactpersonname', header: 'ContactPersoNname' },
      { field: 'phone', header: 'Phone' },
      { field: 'email', header: 'Email' }
  ];
    this.clientcontactpersonservice.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.ClientContactPerson= data;
    });
  }
  create() {   
    if(this.sibebarHeader == 'Edit ClientContactPerson'){
      this.clientcontactpersonservice.update(this.selectedKey,this.clientcontactperson).then(() => {
        console.log('Updated job successfully!');
        this.display = false;
        this.clientcontactperson = {ClientId:'', ContactPersonName:'',Phone:'',Email:''}
      });
    }
    else{
    this.clientcontactpersonservice.create(this.clientcontactperson).then(() => {
      console.log('Created new item successfully!');
      this.display = false;
      this.clientcontactperson= {ClientId:'', ContactPersonName:'',Phone:'',Email:''}
    });
  }
  }
  AddClientContactPerson(){
    this.display = true;
    this.sibebarHeader = 'Add ClientContactPerson'
  }
  edit(key:string,clientcontactperson:ClientContactPerson){
    this.display = true;
    this.sibebarHeader = 'Edit ClientContactPerson'
    this.clientcontactperson = clientcontactperson;
    this.selectedKey = key;
  }
  delete(key:any){
    this.clientcontactpersonservice.delete(key);
  }
}
