import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,} from '@angular/forms';
import { Router } from '@angular/router';
import { Job } from 'src/app/models/job';
import { jobService } from 'src/app/services/job.service';

declare var dataTableInit: any;

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {
  material: any[];
  showLoading: boolean;
  modalHeaderText: string;
  JobsForm = new FormGroup({
    id: new FormControl(''),
    jobName: new FormControl('', [Validators.required]),
    appliedDtate: new FormControl('',[Validators.required]),
    status: new FormControl(true),
  });

  filterJobs: Job[] = [];
  submitted = false;
  Job: Job[];
  constructor(private jobservice:jobService,public router: Router
              ) {}

  ngOnInit() {
    this.Job = [];
    this.getJob();
  }

  ngAfterViewInit() {
    dataTableInit();
  }

  openAddJobsModal() {
    this.resetFilter();
    this.modalHeaderText = 'Add Jobs';
  }

  // searchMaterialDispatch(Name: string, quantity: any) {
  //   this.filterMaterialDispatch = [];
  //   this.filterMaterialDispatch = this.material.filter(
  //     (x) => x.name == Name || x.quantity == quantity
  //   );
  //   if (
  //     this.filterMaterialDispatch &&
  //     this.filterMaterialDispatch.length == 0
  //   ) {
  //     this.resetFilter();
  //   }
  // }

  getJob() {
    this.showLoading = true;
    this.jobservice.getJob().subscribe((response) => {
      this.filterJobs = response.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as {}),
        } as Job;
      });
      this.Job = this.filterJobs;
      this.showLoading = false;
    });
  }
  // get f() { return this.MaterialDispatchForm.controls; }
  // saveMaterialDispatch(type: string) {
  //   this.showLoading = true;
  //   let MaterialDispatchForm = this.MaterialDispatchForm.value;
  //   if (type == 'Add') {
  //     let material: any = {
  //       name: MaterialDispatchForm.name!,
  //       quantity: MaterialDispatchForm.quantity!,
  //       status: MaterialDispatchForm.status!,
  //     };
    //   this.materialdispatchService
    //     .createMaterialDispatch(material)
    //     .then((response) => {
          
    //       this.showLoading = false;
    //       this.MaterialDispatchForm.reset();
    //       document.getElementById('closeModal')!.click();
    //     })
    //     .catch((err) => {
    //       this.showLoading = false;
    //     });
    // } else {
    //     let material: any = {
    //     name: MaterialDispatchForm.name!,
    //     quantity: MaterialDispatchForm.quantity!,
    //     status: MaterialDispatchForm.status!,
    //     id: MaterialDispatchForm.id!,
    //   };
    //   this.materialdispatchService.updateMaterialDispatch(material).then((res) => {
    //     this.showLoading = false;
    //     this.MaterialDispatchForm.reset();
    //     document.getElementById('closeModal')!.click();
    //   });
    // }
  

  // openUpdateMaterialDispatchModal(material: any) {
  //   this.modalHeaderText = 'Edit Material Dispatch';
  //   if (material) {
  //     this.MaterialDispatchForm.patchValue({
  //       name: material.name!,
  //       quantity: material.quantity!,
  //       status: material.status!,
  //       id: material.id,
  //     });
  //   }
  // }

  // openDeleteMaterialDispatchModal(material: any) {
  //   this.MaterialDispatchForm.patchValue({
  //     id: material.id,
  //   });
  // }

  // deleteMaterialDispatch() {
  //   this.showLoading = true;
  //   let MaterialDispatchForm = this.MaterialDispatchForm.value;
  //   this.materialdispatchService
  //     .deleteMaterialDispatch(MaterialDispatchForm.id)
  //     .then((res) => {
  //       this.showLoading = false;
  //       document.getElementById('closeDeleteModal')!.click();
  //     });
  // }

  resetFilter() {
    this.filterJobs = this.Job;
  }

}

