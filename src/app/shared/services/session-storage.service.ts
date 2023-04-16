import { DOCUMENT } from '@angular/common';
import { inject, Injectable, InjectionToken } from '@angular/core';

export const SESSION_STORAGE = new InjectionToken<Storage | null>(
  'session storage',
  {
    factory: () => {
      const document = inject(DOCUMENT, { optional: true });

      if (document?.defaultView) {
        return document?.defaultView?.sessionStorage;
      }

      return null;
    },
  }
);

@Injectable({ providedIn: 'root' })
export class SessionStorageService {
  private readonly ls = inject(SESSION_STORAGE);

  getItem<TData = string>(
    key: string
  ): (TData extends object ? TData : string) | null {
    if (!this.ls) {
      return null;
    }

    const item = this.ls.getItem(key);

    if (!item) {
      return null;
    }

    try {
      const parsed = JSON.parse(item);
      if (typeof parsed === 'object') {
        return parsed;
      }

      return item as TData extends object ? TData : string;
    } catch (e) {
      return item as TData extends object ? TData : string;
    }
  }

  setItem(key: string, data: unknown): void {
    if (!this.ls) return;

    if (typeof data === 'object') {
      this.ls.setItem(key, JSON.stringify(data));
    } else {
      this.ls.setItem(key, data as string);
    }
  }

  removeItem(key: string) {
    if (this.ls) {
      this.ls.removeItem(key);
    }
  }
}
