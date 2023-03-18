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
import { AssetComponent } from './components/Asset/asset.component';
import { AuthGuard } from './services/auth.guard';
const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '', component: AppLayoutComponent, 
    children: [
      { path: 'dashboard',component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'users',    component: UsersComponent, canActivate: [AuthGuard] },
      { path: 'profile',  component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'jobs',     component: JobsComponent, canActivate: [AuthGuard] },
      { path: 'candidate', component: CandidateComponent, canActivate: [AuthGuard] },
      { path: 'asset',     component:AssetComponent, canActivate: [AuthGuard]}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
