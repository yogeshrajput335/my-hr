import { Component } from '@angular/core';
import { candidateService } from 'src/app/services/candidate.service';
import { map } from 'rxjs';
import { candidate } from 'src/app/models/candidate';
@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent {
Candidate:candidate[];

  constructor(
    public candidateService:candidateService
  ){ }

  ngOnInit() {
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
    this.candidateService.create({name:'test',phone:8792795552, email:'test@test.com',tech:'c',visa:'dd', rate:100, date:19/9/2022}).then(() => {
      console.log('Created new item successfully!');
    });
  }
}
