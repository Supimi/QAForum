import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerlistComponent } from './answerlist.component';

describe('AnswerlistComponent', () => {
  let component: AnswerlistComponent;
  let fixture: ComponentFixture<AnswerlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
