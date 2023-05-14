import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';  

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
   userDetails : any;

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('user')!)
  }  
}

 
 

