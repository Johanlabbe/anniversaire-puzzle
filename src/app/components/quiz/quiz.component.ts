// src/app/components/quiz/quiz.component.ts
import { Component, inject, signal, OnDestroy } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnDestroy {
  private gameService = inject(GameService);

  public currentQuestion = signal<number>(1);
  public timeLeft = signal<number>(15);
  public isTimerRunning = signal<boolean>(false);
  public isQuizFinished = signal<boolean>(false);
  public finalScore = signal<number | null>(null);

  private timerInterval: any;

  public startTimer(): void {
    if (this.isTimerRunning() || this.timeLeft() === 0) return;
    
    this.isTimerRunning.set(true);
    this.timerInterval = setInterval(() => {
      if (this.timeLeft() > 0) {
        this.timeLeft.update(t => t - 1);
      } else {
        this.pauseTimer(); // S'arrête automatiquement à 0
      }
    }, 1000);
  }

  // NOUVELLE MÉTHODE POUR LA PAUSE
  public pauseTimer(): void {
    this.isTimerRunning.set(false);
    clearInterval(this.timerInterval);
  }

  public nextQuestion(): void {
    this.pauseTimer();
    if (this.currentQuestion() < 10) {
      this.currentQuestion.update(q => q + 1);
      this.timeLeft.set(15);
    } else {
      this.isQuizFinished.set(true);
    }
  }

  public updateScore(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.finalScore.set(value ? parseInt(value, 10) : null);
  }

  public validateQuiz(): void {
    const score = this.finalScore();
    if (score !== null && score >= 0 && score <= 10) {
      this.gameService.finishQuiz(score);
    }
  }

  ngOnDestroy(): void {
    this.pauseTimer();
  }
}