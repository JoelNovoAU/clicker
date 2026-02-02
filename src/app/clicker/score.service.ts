import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Score {
  player: string;
  clicks: number;
  date?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private apiUrl = 'http://localhost:3000/api/scores';

  constructor(private http: HttpClient) {}

  saveScore(score: Score): Observable<Score> {
    return this.http.post<Score>(this.apiUrl, score);
  }

  getTopScores(): Observable<Score[]> {
    return this.http.get<Score[]>(this.apiUrl);
  }
}
