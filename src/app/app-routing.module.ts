import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes =[
{ path: '',   redirectTo: '/login', pathMatch: 'full' },
{path:'signup',component:SignupComponent},
{path:'login',component:LoginComponent},
 {path:'dashboard',component:DashboardComponent,
 canActivate:[AuthGuard] },
 //children:[
 {path:'profile',component:ProfileComponent,canActivate:[AuthGuard] },
//]},
{ path: '**', redirectTo: '' }
// {path:'signup',component:SignupComponent},
// {path:'signup',component:SignupComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    CommonModule
  ],
  exports: [
  RouterModule
  ]
})
export class AppRoutingModule { }
