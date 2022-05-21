import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlashcardDto } from '../interfaces/flashcard';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {

  baseUrl = 'https://localhost:7290/';

  constructor(private http: HttpClient) { }

  saveFlashcard(flashcard: FlashcardDto) {
    return this.http.post(this.baseUrl + 'create', flashcard)
  }
}
