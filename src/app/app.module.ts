import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environment/environment';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { AppLayoutComponent } from './layout/app-layout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobsComponent } from './components/jobs/jobs.component';
import { TableModule} from 'primeng/table';
import { ButtonModule} from 'primeng/button';
import { CandidateComponent } from './components/candidate/candidate.component';
import { SidebarModule} from 'primeng/sidebar';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AssetComponent } from './components/asset/asset.component';
import { ClientComponent } from './components/client/client.component';
import { ToastModule} from 'primeng/toast';
import { ConfirmDialogModule} from 'primeng/confirmdialog';
import { MenuModule } from 'primeng/menu';
import { PaginatorModule } from 'primeng/paginator';
import { AuthService } from './services/auth.service';
import { ChartModule } from 'primeng/chart';
import { MenubarModule } from 'primeng/menubar';
import {StyleClassModule} from 'primeng/styleclass';
import { EmployeeComponent } from './components/employee/employee.component';
import { ClientRequirementComponent } from './components/clientrequirement/clientrequirement.component';
import { ClientContactPersonComponent } from './components/clientcontactperson/clientcontactperson.component';
import { ClientEmployeeDetailsComponent } from './components/clientemployeedetails/clientemployeedetails.component';
import { LeaveTypeComponent } from './components/leavetype/leavetype.component';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LeaveComponent } from './components/leave/leave.component';
import { LeaveListComponent } from './components/leavelist/leavelist.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { CheckboxModule } from 'primeng/checkbox';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { AttendanceReportComponent } from './components/attendancereport/attendancereport.component';
import { EmailComponent } from './components/email/email.component';
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';
import { DropdownModule } from 'primeng/dropdown';
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    AppLayoutComponent,
    DashboardComponent,
    UsersComponent,
    ProfileComponent,
    JobsComponent,
    CandidateComponent,
    AssetComponent,
    ClientComponent,
    EmployeeComponent,
    ClientRequirementComponent,
    ClientContactPersonComponent,
    ClientEmployeeDetailsComponent,
    LeaveTypeComponent,
    LeaveComponent,
    LeaveListComponent,
    NotificationsComponent,
    AttendanceComponent,
    AttendanceReportComponent,
    EmailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    SidebarModule,
    MenuModule,
    PaginatorModule,
    ChartModule,
    MenubarModule,
    StyleClassModule,
    CalendarModule,
    CheckboxModule,
    InputTextModule,
    ChipModule,
    DropdownModule 
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
