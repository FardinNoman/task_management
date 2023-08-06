import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateTaskComponent } from './task/components/create-task/create-task.component';
import { AuthGuard } from './task/services/auth-guard.service';
import { TaskDetailComponent } from './task/components/task-detail/task-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'task', component: CreateTaskComponent, canActivate: [AuthGuard] },
  { path: 'tasks/:taskId', component: TaskDetailComponent,canActivate: [AuthGuard] }, // Add this line
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
