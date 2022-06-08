import { Component, OnInit } from '@angular/core';
import { TestFlashcardDto } from '../interfaces/flashcard';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-flashcard-test',
  templateUrl: './flashcard-test.component.html',
  styleUrls: ['./flashcard-test.component.css']
})
export class FlashcardTestComponent implements OnInit {

  flashcard : TestFlashcardDto = {  
    topContent: '', bottomContent: '', correctAnswer: '',
    isAnswerCorrect: false,
    attemptNum: 0
  }

  flashcards : TestFlashcardDto[] = [];
  flashcardIdx : number = -1;
  isTestFinished : boolean = false;
  isLastAnswerCorrect : boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadFlashCardsFromServer();
  }

  loadFlashCardsFromServer() : void {
    this.http.get('https://localhost:7290/get').subscribe(response => {
      const flashcardsFromServer = response as any[];

      flashcardsFromServer.forEach(card => {
        this.flashcards.push({
          topContent : card.topContent,
          bottomContent: '',
          correctAnswer: card.bottomContent,
          isAnswerCorrect: false,
          attemptNum: 0
        });
      });

      this.loadFlashcard();

    }, error => {
      console.log(error);
    })
  }

  loadFlashcard() {
    if (this.flashcards && this.flashcards.length != 0 && !this.isTestFinished)
    {
      this.flashcardIdx = this.flashcards.findIndex(card => card.isAnswerCorrect === false || card.attemptNum != 0);

      if (this.flashcardIdx === -1)
      {
        this.isTestFinished = true;
        return;
      }

      this.flashcard = this.flashcards[this.flashcardIdx];
    }
  }

  getRadomFlashcardIndexForTest() {
    throw new Error('Method not implemented.');
  }

  check() : void {

    if (!this.isTestFinished)
    {
      this.isLastAnswerCorrect = this.isAnswerCorrect();
      this.showResult();
      this.updateCard();
      this.loadFlashcard();
    }
    else
    {
      if (this.isTestRestartOptionActivated())
      {
        this.restartFlashcards();
      }
    }
  }

  restartFlashcards() {
    throw new Error('Method not implemented.');
  }

  isTestRestartOptionActivated() : boolean{
    return false;
  }

  updateCard() {
    if (this.isLastAnswerCorrect)
    {
      this.flashcard.isAnswerCorrect = true;
      this.flashcard.bottomContent = '';
      this.flashcard.attemptNum--;

      if (this.flashcard.attemptNum < 0)
      {
        this.flashcard.attemptNum = 0;
      }
    }
    else
    {
      this.flashcard.isAnswerCorrect = false;
      this.flashcard.attemptNum = 2;
    }
    this.flashcard.bottomContent = '';
  }

  showResult() {
    return new Promise(resolve => setTimeout(resolve, 1500));
  }
  
  isAnswerCorrect() {
    return this.flashcard.bottomContent.toLowerCase() === this.flashcard.correctAnswer.toLowerCase();
  }
}
