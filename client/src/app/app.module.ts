import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlashcardComponent } from './flashcard/flashcard.component';
import { FlashcardEditComponent } from './flashcard-edit/flashcard-edit.component';
import { FormsModule } from '@angular/forms';
import { FlashcardTestComponent } from './flashcard-test/flashcard-test.component'

@NgModule({
  declarations: [
    AppComponent,
    FlashcardComponent,
    FlashcardEditComponent,
    FlashcardTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
