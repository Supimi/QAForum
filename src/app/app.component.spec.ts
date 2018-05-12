import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

//components
import { SigninComponent } from './componentes/signin/signin.component';
import { SignupComponent } from './componentes/signup/signup.component';
import { HomeComponent } from './componentes/home/home.component';
import { AdminComponent } from './componentes/admin/admin.component';
import { UserComponent } from './componentes/user/user.component';
import { SignupStudentComponent } from './componentes/signup/signup-student/signup-student.component';
import { SignupOtherComponent } from './componentes/signup/signup-other/signup-other.component';
import { PostlistComponent } from './componentes/user/postlist/postlist.component';
import { FooterComponent } from './componentes/home/footer/footer.component';
import { SignupselectionComponent } from './componentes/signup/signupselection/signupselection.component';
import { AlumniComponent } from './componentes/signup/alumni/alumni.component';
import { QuestionComponent } from './componentes/question/question.component';
import { QuestionsupportService } from './services/questionsupport.service';
import { HistoryComponent } from './componentes/user/history/history.component';
import { HomepageComponent } from './componentes/admin/homepage/homepage.component';
import { AdminHomeComponent } from './componentes/admin/admin-home/admin-home.component';
import { NavbarAdminComponent } from './componentes/admin/navbar-admin/navbar-admin.component';
import { SpecializationComponent } from './componentes/admin/specialization/specialization.component';
import { UsersComponent } from './componentes/admin/users/users.component';
import { NotificationsComponent } from './componentes/admin/notifications/notifications.component';
import { SettingsComponent } from './componentes/admin/settings/settings.component';
import { UserProfileComponent } from './componentes/user/user-profile/user-profile.component';
import { AdminSearchComponent } from './componentes/admin/admin-search/admin-search.component';

//services
import { SignupService } from './services/signup.service';
import { SigninService } from './services/signin.service';
import { QuestionService } from './services/question.service';
import { UserService } from './services/user.service';
import { AdminService } from './services/admin.service';

//other modules
import { RouterModule, Routes } from '@angular/router';



describe('AppComponent', () => {
  const routes: Routes = [{
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
  }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SigninComponent,
        SignupComponent,
        HomeComponent,
        AdminComponent,
        UserComponent,
        SignupStudentComponent,
        SignupOtherComponent,
        PostlistComponent,
        FooterComponent,
        SignupselectionComponent,
        AlumniComponent,
        QuestionComponent,
        HistoryComponent,
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
        RouterModule.forRoot(routes),
      ],
      providers: [SignupService, SigninService, QuestionService, UserService, QuestionsupportService, AdminService]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Q&A Forum');
  }));

});
