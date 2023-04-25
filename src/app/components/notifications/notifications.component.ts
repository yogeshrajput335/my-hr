import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs';
import { Notifications } from 'src/app/models/notifications';
import { notificationsService } from 'src/app/services/notifications.service';
declare var dataTableInit: any;
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit{
  Notifications: Notifications[];
  notification:Notifications = { Subject:'',Description:'',NotifyTo:'',Startdate:'',Enddate:'',Status:'',Notifyall:''};
  selectedProducts: Notifications[];
  cols: any[];
  display = false;
  sibebarHeader = "Add Notification";
  selectedKey=''
  checked:boolean;
  constructor(
    public notificationsservice: notificationsService,
    private messageService: MessageService,
  ){ }
    ngOnInit():void {
      this.cols = [
        { field: 'Subject', header: 'subject', customExportHeader: 'SUBJECT' },
        { field: 'Description', header: 'description' },
        { field: 'NotifyTo', header: 'notifyto' },
        { field: 'StartDate', header: 'startdate' },
        { field: 'EndDate', header: 'enddate' },
        { field: 'Status', header: 'status' },
        { field: 'NotifyAll', header: 'notifyall' },
      ];
    this.notificationsservice.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.Notifications = data;
    });
  }
  create() {   
    if(this.sibebarHeader == 'Edit Notifications'){
      this.notificationsservice.update(this.selectedKey,this.notification).then(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail:'Notification is edited succcessfully' });
        this.display = false;
        this.notification = { Subject:'',Description:'',NotifyTo:'',Startdate:'',Enddate:'',Status:'',Notifyall:''}
      });
    }
    else{
    this.notificationsservice.create(this.notification).then(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail:'Notification is edited succcessfully' });
      this.display = false;
      this.notification = {Subject:'',Description:'',NotifyTo:'',Startdate:'',Enddate:'',Status:'',Notifyall:''}
    });
  }
  }
  AddNotifications(){
    this.display = true;
    this.sibebarHeader = 'Add Notifications'
  }
  edit(key:string,notification:Notifications){
    this.display = true;
    this.sibebarHeader = 'Edit Notifications'
    this.notification= notification;
    this.selectedKey = key;
  }
  delete(key:any){
    this.notificationsservice.delete(key);
  }
} 
