import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { SigninComponent } from './componentes/signin/signin.component';
import { SignupComponent } from './componentes/signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './componentes/admin/admin.component';
import { SignupService } from './services/signup.service';
import { SigninService } from './services/signin.service';
import { ProfileComponent } from './componentes/user/profile/profile.component';
import { UserComponent } from './componentes/user/user.component';
import { SignupStudentComponent } from './componentes/signup/signup-student/signup-student.component';
import { SignupOtherComponent } from './componentes/signup/signup-other/signup-other.component';
import { NavbarComponent } from './componentes/home/navbar/navbar.component';
import { AddquestionComponent } from './componentes/user/addquestion/addquestion.component';
import { QuestionService } from './services/question.service';
import { PostlistComponent } from './componentes/user/postlist/postlist.component';
import { UserService } from './services/user.service';
import { FooterComponent } from './componentes/home/footer/footer.component';
import { SignupselectionComponent } from './componentes/signup/signupselection/signupselection.component';
import { AlumniComponent } from './componentes/signup/alumni/alumni.component';
import { QuestionComponent } from './componentes/question/question.component';
import { QuestionsupportService } from './services/questionsupport.service';
import { HistoryComponent } from './componentes/user/history/history.component';
import { AnswerComponent } from './componentes/answer/answer.component';
import { RatingComponent } from './componentes/answer/rating/rating.component';
import { AnswerlistComponent } from './componentes/question/answerlist/answerlist.component';
import { SearchComponent } from './componentes/user/search/search.component';
import { HomepageComponent } from './componentes/admin/homepage/homepage.component';
import { AdminHomeComponent } from './componentes/admin/admin-home/admin-home.component';
import { NavbarAdminComponent } from './componentes/admin/navbar-admin/navbar-admin.component';
import { SpecializationComponent } from './componentes/admin/specialization/specialization.component';
import { UsersComponent } from './componentes/admin/users/users.component';
import { NotificationsComponent } from './componentes/admin/notifications/notifications.component';
import { SettingsComponent } from './componentes/admin/settings/settings.component';
import { AdminService } from './services/admin.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminSearchComponent } from './componentes/admin/admin-search/admin-search.component';
import { BarRatingModule } from "ngx-bar-rating";
import { UserProfileComponent } from './componentes/user/user-profile/user-profile.component';


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
    children: [{ path: 'signupselection', component: SignupselectionComponent },
    { path: 'signupstudent', component: SignupStudentComponent },
    { path: 'signupalumni', component: AlumniComponent },
    { path: 'signupacademic', component: SignupOtherComponent }

    ]
  },
  {
    path: 'user',
    component: UserComponent,
    children: [{ path: 'recent', component: PostlistComponent }, { path: 'history', component: HistoryComponent }, { path: 'userprofile', component: UserProfileComponent }]
  },
  {
    path: 'question',
    component: QuestionComponent
  },
  {
    path: 'admin2',
    component: AdminComponent
  },
  {
    path: 'admin',
    component: HomepageComponent,
    children: [{ path: 'home', component: AdminHomeComponent }, { path: 'specialization', component: SpecializationComponent }, { path: 'notification', component: NotificationsComponent },
    { path: 'users', component: UsersComponent }, { path: 'settings', component: SettingsComponent }, { path: 'search', component: AdminSearchComponent }]
  }
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
    SignupStudentComponent,
    SignupOtherComponent,
    NavbarComponent,
    AddquestionComponent,
    PostlistComponent,
    FooterComponent,
    SignupselectionComponent,
    AlumniComponent,
    QuestionComponent,
    HistoryComponent,
    AnswerComponent,
    RatingComponent,
    AnswerlistComponent,
    SearchComponent,
    HomepageComponent,
    NavbarAdminComponent,
    SpecializationComponent,
    UsersComponent,
    NotificationsComponent,
    SettingsComponent,
    AdminHomeComponent,
    AdminSearchComponent,
    UserProfileComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule, HttpModule, FormsModule, ReactiveFormsModule, NgxPaginationModule, BarRatingModule
  ],
  providers: [SignupService, SigninService, QuestionService, UserService, QuestionsupportService, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
