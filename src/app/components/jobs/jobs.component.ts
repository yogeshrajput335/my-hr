import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Job } from 'src/app/models/job';
import { jobService } from 'src/app/services/job.service';

declare var dataTableInit: any;

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {

  Jobs: Job[];

  constructor(
    private jobservice: jobService
    ) {}

  ngOnInit():void {
    this.jobservice.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.Jobs = data;
    });
}
  create() {   
    this.jobservice.create({name:'aee',desc:'xyz',startdate:10/3/2021,enddate:20/4/2021 }).then(() => {
      console.log('Created new item successfully!');
    });
  }
}


