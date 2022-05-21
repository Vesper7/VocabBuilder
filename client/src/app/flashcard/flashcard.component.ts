import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css']
})
export class FlashcardComponent implements OnInit {

  flashcards: any;
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getFlashcards();
  }

  getFlashcards() : void {
    this.http.get('https://localhost:7290/get').subscribe(response => {
      this.flashcards = response;
    }, error => {
      console.log(error);
    })
  }
}
