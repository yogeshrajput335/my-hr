import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { map } from 'rxjs';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';  

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
   userDetails : any;
   profile:Profile = {Name:'',Email:'',CompanyEmail:'',PersonalEmail:'',PhoneNumber:''};
   form: FormGroup;

  Profiles=[{
  Name:'shru',
  Email:'shru@gmail.com',
  CompanyEmail:'admin@bluversesystem.com',
  PersonalEmail:'abc@gmail.com',
  PhoneNumber:9865478982
  }];

  ngOnInit(): void {
    this.form = new FormGroup({
      'Profiles': new FormArray([])
    });

    this.Profiles.forEach(profile=> {
      (this.form.get('Profiles') as FormArray).push(this.createProfile(profile.Name));
    });
  }  createProfile(profile) {
    return new FormGroup({
      'Name': new FormControl(name, Validators.required)
    });
  }
  get profiles() {
    return this.form.get('profiles');
  }
 }

 
 

