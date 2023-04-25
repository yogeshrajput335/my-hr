import { Component,OnInit } from '@angular/core';
import { candidateService } from 'src/app/services/candidate.service';
import { map } from 'rxjs';
import { candidate } from 'src/app/models/candidate';
import { MessageService } from 'primeng/api';
declare var dataTableInit: any;

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})

export class CandidateComponent implements OnInit{
display = false;
displayFollowUp = false;  
cols:any;
selectedProducts:candidate[];
sibebarHeader = "Add Candidate";
selectedKey=''
candidate:candidate = {CandidateName:'',email:'',tech:'',visa:'',rate:'',date:'',contactdetails:''};
Candidates: candidate[];
userDetails:any;
description ="";
followUps:any;
initfollowUps:any
  constructor(
    public candidateService:candidateService,
    private messageService: MessageService,
  ){ }
  ngOnInit():void {
    this.userDetails = JSON.parse(localStorage.getItem('user')!)
    this.cols = [
      { field: 'candidatename', header: 'candidatename', customExportHeader: 'CANDIDATENAME' },
      { field: 'phone', header: 'phone' },
      { field: 'email', header: 'email' },
      { field: 'tech', header: 'tech' },
      { field: 'visa', header: 'visa' },
      { field: 'rate', header: 'rate' },
      { field: 'date', header: 'date' },
      { field: 'contactdetails', header: 'contactdetails' },
    ];
   this.candidateService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.Candidates = data;
    });
    this.candidateService.getAllFollowUps().snapshotChanges().pipe(
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
    if(this.sibebarHeader == 'Edit Candidate'){
      this.candidateService.update(this.selectedKey,this.candidate).then(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Candidate is edited succcessfully' });
        this.display = false;
        this.candidate = {CandidateName:'',email:'',tech:'',visa:'',rate:'',date:'',contactdetails:''}
      });
    }
    else{
    this.candidateService.create(this.candidate).then(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail:'Candidate is edited succcessfully' });
      this.display=false;
      this.candidate={ CandidateName:'',email:'',tech:'',visa:'',rate:'',date:'',contactdetails:''}
    });
    }
  }
  AddCandidate(){
    this.display = true;
    this.sibebarHeader = 'Add Candidate'
  }
  edit(key:string,candidate:candidate){
    this.display = true;
    this.sibebarHeader = 'Edit Candidate'
    this.candidate = candidate;
    this.selectedKey = key;
  }
  delete(key:any){
    this.candidateService.delete(key);
  }
  selKey:any;
  selCandidate:any;
  openfollowups(key:any,CandidateName:any){
    this.selKey = key;
    this.selCandidate = CandidateName; 
    this.displayFollowUp = true;
    this.followUps = this.initfollowUps.filter((x:any)=>x.candidateKey == this.selKey);
  }
  createFollowup(){
    this.candidateService.createFollowUp({candidateKey:this.selKey,followupBy:this.userDetails.name,followupDate:new Date().toLocaleString(),description:this.description}).then(() => {
      console.log('Created new item successfully!');
      this.display=false;
      this.description=''
      this.candidateService.getAllFollowUps().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.initfollowUps = data;
        this.followUps = this.initfollowUps.filter((x:any)=>x.candidateKey == this.selKey);
      });
    });
  }
}
