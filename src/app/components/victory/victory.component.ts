import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-victory',
  standalone: true,
  templateUrl: './victory.component.html',
  styleUrl: './victory.component.scss'
})
export class VictoryComponent {
  public gameService = inject(GameService);

  // État de l'affichage
  public step = signal<'key' | 'video' | 'final'>('key');

  // Référence à la balise vidéo dans le HTML
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  public playRickroll(): void {
    this.step.set('video');
    
    // On attend un micro-instant que la vue se mette à jour pour lancer la vidéo
    setTimeout(() => {
      if (this.videoPlayer) {
        this.videoPlayer.nativeElement.play();
      }
    }, 0);
  }

  public skipVideo(): void {
    if (this.videoPlayer) {
      this.videoPlayer.nativeElement.pause();
    }
    this.step.set('final');
  }

  public onVideoEnded(): void {
    this.step.set('final');
  }
}