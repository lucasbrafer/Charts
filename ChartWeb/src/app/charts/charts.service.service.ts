import { environment } from './../../environments/environment';
import { Chart } from 'chart.js';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private readonly API = `${environment.API}data`;

  constructor(private http: HttpClient) {}

  list(): Chart {
    return this.http.get<Chart[]>(this.API).pipe(tap(console.log));
  }
}
