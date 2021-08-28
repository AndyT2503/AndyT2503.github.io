import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  currentMenuSelected$ = new Subject<string>();
  constructor() { }

  updateCurrentMenuSelected(value: string): void {
    this.currentMenuSelected$.next(value);
  }
}
