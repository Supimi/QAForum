import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
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
import { FrontpageComponent } from './componentes/user/frontpage/frontpage.component';
import { HistoryComponent } from './componentes/user/history/history.component';
import { AnswerComponent } from './componentes/answer/answer.component';
import { RatingComponent } from './componentes/answer/rating/rating.component';
import { AnswerlistComponent } from './componentes/question/answerlist/answerlist.component';
import { SearchComponent } from './componentes/user/search/search.component';


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
    children: [{path: 'signupselection' , component : SignupselectionComponent},
    {path: 'signupstudent' , component : SignupStudentComponent},
    {path: 'signupalumni' , component :  AlumniComponent},
    {path: 'signupacademic' , component : SignupOtherComponent}
    
  ]
  },
  {
    path: 'user',
    component: UserComponent,
    children: [{path: 'profile' , component :FrontpageComponent},{path: 'recent' , component : PostlistComponent },{path: 'history' , component :  HistoryComponent },{path: 'admin' , component :AdminComponent}]
  },
  {
    path: 'question',
    component: QuestionComponent
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
    SignupStudentComponent,
    SignupOtherComponent,
    NavbarComponent,
    AddquestionComponent,
    PostlistComponent,
    FooterComponent,
    SignupselectionComponent,
    AlumniComponent,
    QuestionComponent,
    FrontpageComponent,
    HistoryComponent,
    AnswerComponent,
    RatingComponent,
    AnswerlistComponent,
    SearchComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule, HttpModule, FormsModule, ReactiveFormsModule
  ],
  providers: [SignupService, SigninService, QuestionService,UserService,QuestionsupportService ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
