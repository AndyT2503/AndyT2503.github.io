import { DOCUMENT } from '@angular/common';
import {
    DestroyRef,
    Injector,
    inject,
    runInInjectionContext,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, fromEvent } from 'rxjs';
import { assertInjector } from './assert-injector';

export function injectScrollEvent(
  customInjector?: Injector
): Observable<Event> {
  const injector = assertInjector(injectScrollEvent, customInjector);
  return runInInjectionContext(injector, () => {
    const document = inject(DOCUMENT);
    const destroyRef = inject(DestroyRef);
    return fromEvent(document, 'scroll').pipe(takeUntilDestroyed(destroyRef));
  });
}
