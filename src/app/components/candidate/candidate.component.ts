import { Component,OnInit } from '@angular/core';
import { candidateService } from 'src/app/services/candidate.service';
import { map } from 'rxjs';
import { candidate } from 'src/app/models/candidate';
declare var dataTableInit: any;

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit{
display = false;  
cols:any;
selectedProducts:candidate[];
sibebarHeader = "Add Candidate";
selectedKey=''
candidate:candidate = {CandidateName:'',email:'',tech:'',visa:'',rate:'',date:'',contactdetails:''};
Candidates: candidate[];
  constructor(
    public candidateService:candidateService
  ){ }

  ngOnInit():void {
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
  }
  create() {   
    if(this.sibebarHeader == 'Edit Candidate'){
      this.candidateService.update(this.selectedKey,this.candidate).then(() => {
        console.log('Updated job successfully!');
        this.display = false;
        this.candidate = {CandidateName:'',email:'',tech:'',visa:'',rate:'',date:'',contactdetails:''}
      });
    }
    else{
    this.candidateService.create(this.candidate).then(() => {
      console.log('Created new item successfully!');
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
}
