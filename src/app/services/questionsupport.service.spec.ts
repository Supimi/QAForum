import { TestBed, inject } from '@angular/core/testing';

import { QuestionsupportService } from './questionsupport.service';

describe('QuestionsupportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionsupportService]
    });
  });

  it('should be created', inject([QuestionsupportService], (service: QuestionsupportService) => {
    expect(service).toBeTruthy();
  }));
});
