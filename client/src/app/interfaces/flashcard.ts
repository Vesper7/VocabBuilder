export interface FlashcardDto {
  topContent: string
  bottomContent: string
}

export interface TestFlashcardDto {
  topContent: string
  bottomContent: string
  correctAnswer : string
  isAnswerCorrect: boolean
  attemptNum: number
}