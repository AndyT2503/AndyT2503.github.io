import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly _active = signal<string>('intro');
  readonly active = this._active.asReadonly();

  setActive(id: string): void {
    this._active.set(id);
  }
}
