import { Component, OnInit } from '@angular/core';
import { FlashcardDto } from '../interfaces/flashcard';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-flashcard-test',
  templateUrl: './flashcard-test.component.html',
  styleUrls: ['./flashcard-test.component.css']
})
export class FlashcardTestComponent implements OnInit {

  flashCardToCheck: FlashcardDto = { TopContent: '', BottomContent: '' };
  flashcards: any[] = [];
  flashcardsForTest: any[] = []; 
  isLastAnswerCorrect : any = false;
  showResultForLastQuestion : any = false;
  correctAnswer : string = '';
  currentIdx : any = 0;
  isTestFinished : any = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadFlashCards();
  }

  loadFlashCards() : void {
    this.http.get('https://localhost:7290/get').subscribe(response => {
      this.flashcards = response as any[];
      this.flashcards.forEach(flashcard => {
        this.flashcardsForTest.push({
          TopContent: flashcard.topContent, 
          BottomContent: flashcard.bottomContent, 
          IsCorrect: false
        });
      });

      this.flashCardToCheck.TopContent = this.flashcardsForTest[this.currentIdx].TopContent;
      this.correctAnswer = this.flashcardsForTest[this.currentIdx].BottomContent;

    }, error => {
      console.log(error);
    })
  }

  check() : void {
    this.showResultForLastQuestion = true;
    this.isLastAnswerCorrect = this.flashCardToCheck.BottomContent === this.correctAnswer;
    new Promise(timeout => setTimeout(timeout, 1500));
    
    this.flashcardsForTest[this.currentIdx] = {
      TopContent: this.flashcardsForTest[this.currentIdx].TopContent, 
      BottomContent: this.flashcardsForTest[this.currentIdx].BottomContent, 
      IsCorrect: this.isLastAnswerCorrect
    }

    const nextflashcard = this.flashcardsForTest.find( f => f.IsCorrect === false);
    this.currentIdx = this.flashcardsForTest.findIndex( f => f === nextflashcard);

    this.flashCardToCheck.TopContent = nextflashcard.TopContent;
    this.correctAnswer = nextflashcard.BottomContent;

    this.showResultForLastQuestion = false;
    this.flashCardToCheck.BottomContent = '';
  }
}
