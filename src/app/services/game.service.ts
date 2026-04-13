import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public step = signal<number>(1);
  public score = signal<number>(0);
  public keyParts = signal<string[]>([]);
  
  public fullKey = computed(() => this.keyParts().join('-'));
// Dans game.service.ts

  public finishQuiz(points: number): void {
    this.score.set(points);
    // Partie 1 de la fausse clé (L'interrogatoire)
    this.keyParts.update(parts => [...parts, 'M4Y7H']); 
    this.step.set(2);
  }

  public validateCharade(answer: string): boolean {
    if (answer.toLowerCase().trim() === 'discord') {
      // Partie 2 de la fausse clé (La charade)
      this.keyParts.update(parts => [...parts, 'EF0RC']); 
      this.step.set(3);
      return true;
    }
    return false;
  }

  public validateCesar(answer: string): boolean {
    if (answer.toUpperCase().trim() === 'JEDI') {
      // Partie 3 de la fausse clé (Le code César)
      this.keyParts.update(parts => [...parts, 'EW17U']); 
      this.step.set(4);
      return true;
    }
    return false;
  }
}