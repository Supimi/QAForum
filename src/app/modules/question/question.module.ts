import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostlistComponent } from '../../componentes/user/postlist/postlist.component';
import { AnswerComponent } from '../../componentes/answer/answer.component';
import { QuestionComponent} from '../../componentes/question/question.component';
import { QuestionsupportService} from '../../services/questionsupport.service';
import { Router} from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    PostlistComponent,
    QuestionComponent,
    AnswerComponent,
  

  ],
  declarations: [ Router],
  providers: [QuestionsupportService],
})
export class QuestionModule { }
