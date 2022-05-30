import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardTestComponent } from './flashcard-test.component';

describe('FlashcardTestComponent', () => {
  let component: FlashcardTestComponent;
  let fixture: ComponentFixture<FlashcardTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashcardTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
