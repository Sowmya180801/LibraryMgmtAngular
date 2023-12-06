import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book/book.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AddbookComponent } from './addbook/addbook.component';
import { SingleviewComponent } from './singleview/singleview.component';
import { UpdatebookComponent } from './updatebook/updatebook.component';
import { ProfileComponent } from './profile/profile.component';
import { IndexComponent } from './index/index.component';
import { AuthGuard } from './auth.guard';
import { SuccessComponent } from './success/success.component';
import { FalseComponent } from './false/false.component';
import { NotfoundComponent } from './notfound/notfound.component';
const routes: Routes = [
  {path:"",component:IndexComponent},
  {path:"books",component:BookComponent,canActivate: [AuthGuard]},
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},  
  {path:"addbook",component:AddbookComponent,canActivate: [AuthGuard]},
  {path:"singlebook/:bookid",component:SingleviewComponent,canActivate: [AuthGuard]},
  {path:"updatebook/:bookid",component:UpdatebookComponent,canActivate: [AuthGuard]},
  {path:"profile/:userid",component:ProfileComponent,canActivate: [AuthGuard]},
  {path:"success",component:SuccessComponent,canActivate:[AuthGuard]},
  {path:"false",component:FalseComponent,canActivate:[AuthGuard]},
  { path: '**', component: NotfoundComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
