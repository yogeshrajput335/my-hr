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
Candidate:candidate[];
cols:any;
selectedProducts:candidate[];
sibebarHeader = "Add Candidate";
selectedKey=''
candidate:candidate = {name:'',phone:'',email:'',tech:'',visa:'',rate:'',date:''};
  constructor(
    public candidateService:candidateService
  ){ }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'name', customExportHeader: 'NAME' },
      { field: 'phone', header: 'phone' },
      { field: 'email', header: 'email' },
      { field: 'tech', header: 'tech' },
      { field: 'visa', header: 'visa' },
      { field: 'rate', header: 'rate' },
      { field: 'date', header: 'date' },
    ];

    this.candidateService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.Candidate = data;
    });
  }
  create() {   
    if(this.sibebarHeader == 'Edit Candidate'){
      this.candidateService.update(this.selectedKey,this.candidate).then(() => {
        console.log('Updated job successfully!');
        this.display = false;
        this.candidate = {name:'', phone:'',email:'',tech:'',visa:'',rate:'',date:''}
      });
    }
    else{
    this.candidateService.create({name:'test',phone:'', email:'test@test.com',tech:'c',visa:'dd', rate:'', date:''}).then(() => {
      console.log('Created new item successfully!');
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
