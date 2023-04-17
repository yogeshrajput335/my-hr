import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { LandingComponent } from './landing/landing.component';
import { AppLayoutComponent } from './layout/app-layout.component';
import { CandidateComponent } from './components/candidate/candidate.component';
import { ClientComponent } from './components/client/client.component';
import { AuthGuard } from './services/auth.guard';
import { EmployeeComponent } from './components/employee/employee.component';
import { ClientEmployeeDetailsComponent } from './components/clientemployeedetails/clientemployeedetails.component';
import { LeaveTypeComponent } from './components/leavetype/leavetype.component';
import { LeaveComponent } from './components/leave/leave.component';
import { LeaveListComponent } from './components/leavelist/leavelist.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { AttendanceReportComponent } from './components/attendancereport/attendancereport.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { EmailComponent } from './components/email/email.component';
import { AssetComponent } from './components/asset/asset.component';
const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '', component: AppLayoutComponent, 
    children: [
      { path: 'dashboard',              component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'users',                  component: UsersComponent, canActivate: [AuthGuard] },
      { path: 'profile',                component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'jobs',                   component: JobsComponent, canActivate: [AuthGuard] },
      { path: 'candidate',              component: CandidateComponent, canActivate: [AuthGuard] },
      { path: 'asset',                  component: AssetComponent, canActivate: [AuthGuard]},
      { path: 'client',                 component: ClientComponent, canActivate: [AuthGuard]},
      { path: 'employee',               component: EmployeeComponent, canActivate: [AuthGuard]},
      { path: 'clientemployeedetails',  component: ClientEmployeeDetailsComponent, canActivate: [AuthGuard]},
      { path: 'leavetype',              component: LeaveTypeComponent, canActivate: [AuthGuard]},
      { path: 'leave',                  component: LeaveComponent, canActivate: [AuthGuard]},
      { path: 'leavelist',              component: LeaveListComponent, canActivate: [AuthGuard]},
      { path: 'notifications',          component: NotificationsComponent, canActivate: [AuthGuard]},
      { path: 'attendance',             component: AttendanceComponent, canActivate: [AuthGuard]},
      { path: 'attendancereport',       component: AttendanceReportComponent, canActivate: [AuthGuard]},
      { path: 'email',                  component: EmailComponent, canActivate: [AuthGuard]},
    ]
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
