import { DOCUMENT, inject } from '@angular/core';
import { createInjectionToken } from '@shared/utils/di';

export const [injectWindow] = createInjectionToken<Window>(
  'Global window object',
  {
    providedIn: 'root',
    factory: () => {
      const document = inject(DOCUMENT);
      return document.defaultView || ({} as Window);
    },
  },
);
