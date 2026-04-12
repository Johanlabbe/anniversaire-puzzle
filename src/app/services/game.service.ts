import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public step = signal<number>(1);
  public score = signal<number>(0);
  public keyParts = signal<string[]>([]);
  
  public fullKey = computed(() => this.keyParts().join('-'));

  public finishQuiz(points: number): void {
    this.score.set(points);
    // Pense à remplacer 'XXXX' par la vraie 1ère partie de ta clé
    this.keyParts.update(parts => [...parts, 'XXXX']); 
    this.step.set(2);
  }

  public validateCharade(answer: string): boolean {
    if (answer.toLowerCase().trim() === 'discord') {
      // Pense à remplacer 'YYYY' par la vraie 2ème partie
      this.keyParts.update(parts => [...parts, 'YYYY']); 
      this.step.set(3);
      return true;
    }
    return false;
  }

  public validateCesar(answer: string): boolean {
    if (answer.toUpperCase().trim() === 'JEDI') {
      // Pense à remplacer 'ZZZZ' par la vraie 3ème partie
      this.keyParts.update(parts => [...parts, 'ZZZZ']); 
      this.step.set(4);
      return true;
    }
    return false;
  }
}