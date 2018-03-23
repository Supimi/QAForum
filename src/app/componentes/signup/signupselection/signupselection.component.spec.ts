import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupselectionComponent } from './signupselection.component';

describe('SignupselectionComponent', () => {
  let component: SignupselectionComponent;
  let fixture: ComponentFixture<SignupselectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupselectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
