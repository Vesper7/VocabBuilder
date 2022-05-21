import { Component, OnInit } from '@angular/core';
import { FlashcardDto } from '../interfaces/flashcard';
import { FlashcardService } from '../Services/flashcard.service';

@Component({
  selector: 'app-flashcard-edit',
  templateUrl: './flashcard-edit.component.html',
  styleUrls: ['./flashcard-edit.component.css']
})
export class FlashcardEditComponent implements OnInit {

  flashcard : FlashcardDto = {TopContent: '', BottomContent: ''};

  constructor(private flashcardService: FlashcardService) { }

  ngOnInit(): void {
  }

  saveFlashcard(): void {
    this.flashcardService.saveFlashcard(this.flashcard).subscribe(response => {
      console.log(response);
      this.flashcard = {TopContent: '', BottomContent: ''};
    }, error => {
      console.log(error);
    })
  }
}
