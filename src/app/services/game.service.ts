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
    this.keyParts.update(parts => [...parts, 'FK5IH']); 
    this.step.set(2);
  }

  public validateCharade(answer: string): boolean {
    if (answer.toLowerCase().trim() === 'discord') {
      this.keyParts.update(parts => [...parts, 'NGV2T']); 
      this.step.set(3);
      return true;
    }
    return false;
  }

  public validateCesar(answer: string): boolean {
    if (answer.toUpperCase().trim() === 'JEDI') {
      this.keyParts.update(parts => [...parts, 'MT3X9']); 
      this.step.set(4);
      return true;
    }
    return false;
  }
}