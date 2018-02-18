import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { SigninComponent } from './componentes/signin/signin.component';
import { SignupComponent } from './componentes/signup/signup.component';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './componentes/admin/admin.component';
import { SignupService} from './services/signup.service';
import { SigninService} from './services/signin.service';
import { ProfileComponent } from './componentes/user/profile/profile.component';
import { UserComponent } from './componentes/user/user.component';
import { SignupnavComponent } from './componentes/signup/signupnav/signupnav.component';
import { SignupStudentComponent } from './componentes/signup/signup-student/signup-student.component';
import { SignupOtherComponent } from './componentes/signup/signup-other/signup-other.component';
import { NavbarComponent } from './componentes/home/navbar/navbar.component';
import { AddquestionComponent } from './componentes/user/addquestion/addquestion.component';
import { AddquestionService } from './services/addquestion.service';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'user',
    component: UserComponent,
    children: [{path: 'profile' , component : ProfileComponent}]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    AdminComponent,
    ProfileComponent,
    UserComponent,
    SignupnavComponent,
    SignupStudentComponent,
    SignupOtherComponent,
    NavbarComponent,
    AddquestionComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule, HttpModule, FormsModule, ReactiveFormsModule
  ],
  providers: [DataService, SignupService, SigninService, AddquestionService ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
