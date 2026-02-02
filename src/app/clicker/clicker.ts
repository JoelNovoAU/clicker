import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreService, Score } from './score.service';

@Component({
  selector: 'app-clicker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clicker.html',
  styleUrls: ['./clicker.css']
})
export class Clicker implements OnDestroy {
  clicks = 0;
  timeLeft = 30;
  intervalId: any;
  isRunning = false;
  playerName: string = '';
  topScores: Score[] = [];

  constructor(private cdr: ChangeDetectorRef, private scoreService: ScoreService) {
    this.loadTopScores();
  }

  startGame() {
    // Pedir nombre al iniciar
    const name = prompt('Ingresa tu nombre para el juego:');
    if (!name || name.trim() === '') {
      alert('Debes ingresar un nombre para jugar.');
      return;
    }
    this.playerName = name.trim();

    if (this.intervalId) clearInterval(this.intervalId);

    this.clicks = 0;
    this.timeLeft = 30;
    this.isRunning = true;
    this.cdr.markForCheck();

    this.intervalId = setInterval(() => {
      this.timeLeft--;
      this.cdr.markForCheck();

      if (this.timeLeft <= 0) {
        clearInterval(this.intervalId);
        this.isRunning = false;
        this.cdr.markForCheck();
        this.finishGame();
      }
    }, 1000);
  }

  addClick() {
    if (!this.isRunning) return;
    this.clicks++;
    this.cdr.markForCheck();
  }

  finishGame() {
    const score: Score = {
      player: this.playerName,
      clicks: this.clicks
    };

    this.scoreService.saveScore(score).subscribe({
      next: () => this.loadTopScores(),
      error: err => console.error(err)
    });
  }

  loadTopScores() {
    this.scoreService.getTopScores().subscribe({
      next: scores => (this.topScores = scores),
      error: err => console.error(err)
    });
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
