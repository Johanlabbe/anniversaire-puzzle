import { Component, inject, signal } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-cesar',
  standalone: true,
  templateUrl: './cesar.component.html',
  styleUrl: './cesar.component.scss'
})
export class CesarComponent {
  private gameService = inject(GameService);

  public answer = signal<string>('');
  public hasError = signal<boolean>(false);

  public updateAnswer(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.answer.set(value);
    this.hasError.set(false);
  }

  public submitAnswer(): void {
    const isValid = this.gameService.validateCesar(this.answer());
    if (!isValid) {
      this.hasError.set(true);
    }
  }
}