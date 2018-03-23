import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { SignupOtherComponent } from './signup-other.component';

describe('SignupOtherComponent', () => {
  let component: SignupOtherComponent;
  let fixture: ComponentFixture<SignupOtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupOtherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
