import { Component, inject, signal } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-charade',
  standalone: true,
  templateUrl: './charade.component.html',
  styleUrl: './charade.component.scss'
})
export class CharadeComponent {
  private gameService = inject(GameService);

  public answer = signal<string>('');
  public hasError = signal<boolean>(false);

  public updateAnswer(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.answer.set(value);
    this.hasError.set(false); // On enlève l'erreur dès qu'il recommence à taper
  }

  public submitAnswer(): void {
    const isValid = this.gameService.validateCharade(this.answer());
    if (!isValid) {
      this.hasError.set(true); // Affiche le message d'erreur si ce n'est pas le bon mot
    }
  }
}