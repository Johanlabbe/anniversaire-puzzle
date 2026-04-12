import { Component, inject, signal, OnInit } from '@angular/core';
import { GameService } from './services/game.service';
import { QuizComponent } from './components/quiz/quiz.component';
import { CharadeComponent } from './components/charade/charade.component';
import { CesarComponent } from './components/cesar/cesar.component';
import { VictoryComponent } from './components/victory/victory.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [QuizComponent, CharadeComponent, CesarComponent, VictoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public gameService = inject(GameService);
  
  public isDarkMode = signal<boolean>(true);

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
      this.isDarkMode.set(false);
      document.body.classList.remove('dark-theme');
    } else {
      this.isDarkMode.set(true);
      document.body.classList.add('dark-theme');
    }
  }

  public toggleTheme() {
    this.isDarkMode.update(dark => !dark);
    if (this.isDarkMode()) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }
}