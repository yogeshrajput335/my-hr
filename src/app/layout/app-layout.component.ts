import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent {
  title = 'my-hr';
  userDetails:any ;
  items: MenuItem[];
  constructor(
    public authService: AuthService
  ) { 
    this.userDetails = JSON.parse(localStorage.getItem('user')!)
    this.items = [
        {
          label: 'Home',
          icon: 'pi pi-fw pi-home',
          routerLink: 'dashboard'
      },
      {
          label: 'Portal',
          icon: 'pi pi-fw pi-desktop',
          items: [
              {
                  label: 'Users',
                  icon: 'pi pi-fw pi-users',
                  routerLink: 'users'
              },
              {
                  label: 'Profile',
                  icon: 'pi pi-fw pi-user',
                  routerLink: 'profile'
              },
              {
                  label: 'Candidate',
                  icon: 'pi pi-fw pi-user-plus',
                  routerLink: 'candidate'
              },
              {
                  label: 'Jobs',
                  icon: 'pi pi-fw pi-bell',
                  routerLink: 'jobs'
              },
              {
                  label: 'Asset',
                  icon: 'pi pi-fw pi-globe',
                  routerLink: 'asset'
              },
              {
                  label: 'Employee',
                  icon: 'pi pi-fw pi-id-card',
                  routerLink: 'employee'
              },
          
           ]
      },
      {
        label: 'Client',
        icon: 'pi pi-fw pi-pencil',
        items: [
            {
                label: 'Client',
                icon: 'pi pi-fw pi-align-justify',
                routerLink: 'client'
            },
            {
                label: 'Client Requirement',
                icon: 'pi pi-fw pi-align-left',
                routerLink: 'clientrequirement'
            },
            {
                label: 'Client Followup',
                icon: 'pi pi-fw pi-align-right',
                routerLink: 'clientfollowup'
            },
            {
                label: 'Client Contact Person',
                icon: 'pi pi-fw pi-align-center',
                routerLink: 'clientcontactperson'
            }
        ]
    },
    {
        label: 'Leave',
        icon: 'pi pi-fw pi-th-large',
        items: [
            {
                label: 'Leave',
                icon: 'pi pi-fw pi-caret-left',
                routerLink: 'leave'
             },
            {
                label: 'Leave Type',
                icon: 'pi pi-fw  pi-caret-right',
                routerLink: 'leavetype'
            },
          
             {
                label: 'Apply Leave',
                icon: 'pi pi-fw pi-caret-up',
                routerLink: 'applyleave'
             },
             {
                label: 'Leave List',
                icon: 'pi pi-fw pi-caret-down',
                routerLink: 'leavelist'
             },

        ]
    },

      {
          label: 'Quit',
          icon: 'pi pi-fw pi-power-off',
          command: () => this.authService.SignOut()
          ,
      }
  ];
  }
}
