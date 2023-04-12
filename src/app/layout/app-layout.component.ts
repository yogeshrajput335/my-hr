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
    if(this.userDetails.isAdmin){
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
                    label: 'Email',
                    icon: 'pi pi-fw pi-envelope',
                    routerLink: 'email'
              },
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
              {
                label: 'Notifications',
                icon: 'pi pi-fw la la-bullhorn',
                routerLink: 'notifications'
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
        ]
    },
    {
        label: 'Leave',
        icon: 'pi pi-fw pi-hourglass',
        items: [
            {
                label: 'Leave',
                icon: 'pi pi-fw pi-moon',
                routerLink: 'leave'
             },
            {
                label: 'Leave Type',
                icon: 'pi pi-fw  pi-prime',
                routerLink: 'leavetype'
            },
             {
                label: 'Leave List',
                icon: 'pi pi-fw pi-palette',
                routerLink: 'leavelist'
             },

        ]
    },
    {
        label: 'Attendance',
        icon: 'pi pi-fw pi-microsoft',
        items: [
            {
                label: 'Attendance',
                icon: 'pi pi-fw pi-check-square',
                routerLink: 'attendance'
             },
            {
                label: 'Attendance Report',
                icon: 'pi pi-fw  pi-chart-line',
                routerLink: 'attendancereport'
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
} else{
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
                    label: 'Email',
                    icon: 'pi pi-fw pi-envelope',
                    routerLink: 'email'
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
              }
          
           ]
      },
    {
        label: 'Leave',
        icon: 'pi pi-fw pi-th-large',
        items: [
            {
                label: 'Leave',
                icon: 'pi pi-fw pi-qrcode',
                routerLink: 'leave'
             }

        ]
    },
    {
        label: 'Attendance',
        icon: 'pi pi-fw pi-microsoft',
        items: [
            {
                label: 'Attendance',
                icon: 'pi pi-fw pi-check-square',
                routerLink: 'attendance'
             }
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
}
