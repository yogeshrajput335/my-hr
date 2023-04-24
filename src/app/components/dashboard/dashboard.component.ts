import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { candidateService } from 'src/app/services/candidate.service';
import { clientService } from 'src/app/services/client.service';
import { dashboardService } from 'src/app/services/dashboard.service';
import { emailService } from 'src/app/services/email.service';
import { jobService } from 'src/app/services/job.service';
import { leaveService } from 'src/app/services/leave.service';
import { employeeService } from 'src/app/services/employee.service';
import { attendanceService } from 'src/app/services/attendance.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
    data: any;
    userDetails:any;
    emails:any
    options: any;
    leaves:any;
    finalTemplate='';
    candidateCount = 0;
    clientCount = 0;
    jobCount = 0;
    employeeCount=0;
    attendanceCount=0;
    attendance: any;
    
    constructor(private service : dashboardService, private emailservice:emailService, private candidateservice: candidateService,
        private clientservice:clientService,private jobservice:jobService,
        private employeeservice:employeeService, private leaveservice:leaveService,
        private attendanceservice:attendanceService) { 

        this.userDetails = JSON.parse(localStorage.getItem('user')!)
        this.candidateservice.getAll().snapshotChanges().pipe(
            map(changes =>
                changes.map(c =>
                ({ key: c.payload.key, ...c.payload.val() })
                )
            )
        ).subscribe((data:any) => {
            this.candidateCount = data.length;
        });

        this.clientservice.getAll().snapshotChanges().pipe(
            map(changes =>
                changes.map(c =>
                ({ key: c.payload.key, ...c.payload.val() })
                )
            )
        ).subscribe((data:any) => {
            this.clientCount = data.length;
        });

        this.jobservice.getAll().snapshotChanges().pipe(
            map(changes =>
                changes.map(c =>
                ({ key: c.payload.key, ...c.payload.val() })
                )
            )
        ).subscribe((data:any) => {
            this.jobCount = data.length;
        });

        this.employeeservice.getAll().snapshotChanges().pipe(
            map(changes =>
                changes.map(c =>
                ({ key: c.payload.key, ...c.payload.val() })
                )
            )
        ).subscribe((data:any) => {
            this.employeeCount = data.length;
        });

        this.leaveservice.getDashboardLeaves(this.userDetails.isAdmin,this.userDetails.name).snapshotChanges().pipe(
            map(changes =>
              changes.map(c =>
                ({ key: c.payload.key, ...c.payload.val() })
              )
            )
          ).subscribe((data:any) => {
            this.leaves = data.filter((x:any)=>new Date(x.FromDate)>new Date());
          });

          this.attendanceservice.getDashboardAttendance(this.attendance.isAdmin,this.userDetails.name).snapshotChanges().pipe(
            map(changes =>
              changes.map(c =>
                ({ key: c.payload.key, ...c.payload.val() })
              )
            )
          ).subscribe((data:any) => {
            this.attendance= data.filter((x:any)=>new Date(x.PresentDate)>new Date());
          });


          this.userDetails = JSON.parse(localStorage.getItem('user')!)
          this.emailservice.getEmailAll().snapshotChanges().pipe(
            map(changes =>
              changes.map(c =>
                ({ key: c.payload.key, ...c.payload.val() })
              )
            )
          ).subscribe((data:any) => {
            this.emails = data.reverse().slice(0, 5);
           });

           this.attendanceservice.getAll().snapshotChanges().pipe(
            map(changes =>
                changes.map(c =>
                ({ key: c.payload.key, ...c.payload.val() })
                )
            )
        ).subscribe((data:any) => {
            this.attendanceCount = data.length;
        });
    }
    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };
        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }

            }
        };
    }
  
}

