import { Component, OnInit } from '@angular/core';
import { FlashcardDto } from '../interfaces/flashcard';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-flashcard-test',
  templateUrl: './flashcard-test.component.html',
  styleUrls: ['./flashcard-test.component.css']
})
export class FlashcardTestComponent implements OnInit {

  flashCardToCheck: FlashcardDto = { TopContent: '', BottomContent: '' };
  flashcards: FlashcardDto[] = [];
  flashcardsForTest: any[] = []; 
  isLastAnswerCorrect : any = false;
  isTestStarted : any = false;
  correctAnswer : string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadFlashCards();
  }

  loadFlashCards() : void {
    this.http.get('https://localhost:7290/get').subscribe(response => {
      this.flashcards = response as FlashcardDto[];
      this.flashcards.forEach(flashcard => {
        this.flashcardsForTest.push({
          TopContent: flashcard.TopContent, 
          BottomContent: flashcard.BottomContent, 
          IsCorrect: false, 
          NeedRepetition: false
        });
      });

      this.flashCardToCheck.TopContent = this.flashcardsForTest[0].TopContent;
      this.correctAnswer = this.flashcardsForTest[0].BottomContent;

    }, error => {
      console.log(error);
    })
  }

  check() : void {
    this.isTestStarted = true;

    this.isLastAnswerCorrect = this.flashCardToCheck.BottomContent === this.correctAnswer;
  }
}
