import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupStudentComponent } from './signup-student.component';

describe('SignupStudentComponent', () => {
  let component: SignupStudentComponent;
  let fixture: ComponentFixture<SignupStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
