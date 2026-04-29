# How Angular Change Detection Works without Zone.js

## Introduction

Angular Change Detection is the process that keeps the UI in sync with component state. When a value changes in TypeScript, Angular must update the template. For example:

```html
<h1>{{ title }}</h1>
```

If `title` changes, Angular needs to update the text in the DOM. This is important because users should always see the latest state of the application.

## How Change Detection Worked Before with Zone.js

In older Angular applications, Zone.js helped Angular know when it should run Change Detection. Zone.js patches common async browser APIs, such as:

- click events
- HTTP requests
- `setTimeout`
- `setInterval`
- promises

After one of these async tasks finishes, Zone.js can notify Angular. Then Angular runs Change Detection.

```ts
setTimeout(() => {
  this.message = 'Loaded';
}, 1000);
```

With Zone.js, Angular can update this template automatically:

```html
<p>{{ message }}</p>
```

This was convenient, but it also had problems. Zone.js can add runtime overhead. It can also make updates feel implicit. Sometimes Change Detection runs because of an async task, but the reason is not clear from your component code. That is one reason Angular is moving to a more explicit model.

## Why Angular Is Moving Away from Zone.js

Angular is moving toward zoneless Change Detection. The goal is to make UI updates more predictable. In a zoneless app, Angular does not depend on Zone.js to watch all async browser tasks. Instead, Angular listens to Angular-level notifications.

This gives some benefits:

- better performance
- fewer unnecessary checks
- clearer update triggers
- more control for developers
- better support for Signals

The main idea is simple: Angular should run Change Detection when Angular knows that UI state changed.

## Introduction to Zoneless in Angular

Zoneless is the default in Angular v21+ so you do not need to do anything to enable it. You should verify that `provideZoneChangeDetection` is not used anywhere to override the default configuration.

If you are using Angular v20, enable zoneless change detection by adding `provideZonelessChangeDetection()` at bootstrap:
```ts
import { provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection()
  ]
});
```

From Angular core, `provideZonelessChangeDetection()` provides the zoneless scheduler and replaces `NgZone` with `NoopNgZone`:

```ts
{provide: ChangeDetectionScheduler, useExisting: ChangeDetectionSchedulerImpl},
{provide: NgZone, useClass: NoopNgZone},
{provide: ZONELESS_ENABLED, useValue: true},
```

So Angular no longer needs Zone.js to decide when to schedule a render update. Instead, Angular uses `ChangeDetectionSchedulerImpl`.

## Change Detection Triggers in Zoneless Mode

In zoneless mode, Angular still runs Change Detection. The difference is that Angular does not wait for Zone.js to say, "An async task finished." Angular has its own triggers.

The common triggers are:

- a signal used in a template changes
- a component input is set
- a template or host listener runs
- `ChangeDetectorRef.markForCheck()` is called

## Deep Dive into the Angular Core Flow

Now let us follow the main path in Angular core.

### Signal Path

When a signal is read in a template, Angular tracks it with a reactive template consumer. When that signal changes, Angular marks the ancestors for traversal.

```ts
export function markAncestorsForTraversal(lView: LView) {
  // Notify scheduler that Angular needs to traverse the view tree again.
  lView[ENVIRONMENT].changeDetectionScheduler?.notify(NotificationSource.MarkAncestorsForTraversal);

  // Mark parent views for traversal.
  ...
}
```

This function tells Angular that some part of the view tree must be visited again.

### Other Triggers Call markViewDirty

For inputs, listeners, and `markForCheck()`, Angular usually goes through `markViewDirty()`. For example, when an input is set:

```ts
setInput(name: string, value: unknown): void {
  ...
  markViewDirty(childComponentLView, NotificationSource.SetInput);
}
```

For a template listener:

```ts
function wrapListenerIn_markDirtyAndPreventDefault(event: any) {
  ...
  markViewDirty(startView, NotificationSource.Listener);
  ...
}
```

For `ChangeDetectorRef.markForCheck()`:

```ts
markForCheck(): void {
  markViewDirty(this._cdRefInjectingView || this._lView, NotificationSource.MarkForCheck);
}
```

All of these paths call `markViewDirty()`.

```ts
export function markViewDirty(lView: LView, source: NotificationSource): LView | null {
  // Decide which dirty flags should be used for the current state.
  const dirtyBitsToUse = isRefreshingViews()
    ? LViewFlags.Dirty
    : LViewFlags.RefreshView | LViewFlags.Dirty;

  // Notify the zoneless scheduler about this change.
  lView[ENVIRONMENT].changeDetectionScheduler?.notify(source);

  while (lView) {
    // Mark current view and ancestor views as dirty.
    lView[FLAGS] |= dirtyBitsToUse;

    // Walk up to the root view.
    const parent = getLViewParent(lView);

    if (isRootView(lView) && !parent) {
      return lView;
    }

    lView = parent!;
  }

  return null;
}
```

This function marks the view tree and sends the notification to the zoneless scheduler.

### The Scheduler Receives the Notification

The scheduler receives the source in `notify()`. Before scheduling a tick, Angular maps the source to dirty flags and checks whether a tick should be scheduled.

```ts
notify(source: NotificationSource): void {
  // Check whether zoneless is enabled and whether this source should notify the scheduler.
  ...

  // Convert the notification source into ApplicationRef dirty flags.
  ...

  // Stop here if a tick is already scheduled, already running, or the app is destroyed.
  ...

  const scheduleCallback = this.useMicrotaskScheduler
    ? scheduleCallbackWithMicrotask
    : scheduleCallbackWithRafRace;

  this.pendingRenderTaskId = this.taskService.add();

  if (this.scheduleInRootZone) {
    this.cancelScheduledCallback = Zone.root.run(() => scheduleCallback(() => this.tick()));
  } else {
    this.cancelScheduledCallback = this.ngZone.runOutsideAngular(() =>
      scheduleCallback(() => this.tick()),
    );
  }
}
```

This is the difference from Zone.js. Zone.js says, "An async task happened." Zoneless says, "This Angular view or reactive value changed." Then Angular schedules `this.tick()`.

### The Scheduler Calls tick()

After the scheduler callback runs, Angular calls `tick()`.

```ts
private tick(): void {
  if (this.runningTick || this.appRef.destroyed) {
    return;
  }

  if (this.appRef.dirtyFlags === ApplicationRefDirtyFlags.None) {
    this.cleanup();
    return;
  }

  const task = this.taskService.add();

  try {
    this.ngZone.run(
      () => {
        this.runningTick = true;

        // Start application-level Change Detection.
        this.appRef._tick();
      },
      undefined,
      this.schedulerTickApplyArgs,
    );
  } catch (e: unknown) {
    this.applicationErrorHandler(e);
  } finally {
    this.taskService.remove(task);
    this.cleanup();
  }
}
```

At this point, Angular starts the real Change Detection work for the application.

### ApplicationRef Runs Synchronization

`ApplicationRef._tick()` calls the internal synchronization flow.

```ts
private tickImpl = (): void => {
  ...

  try {
    this._runningTick = true;
    this.synchronize();
    ...
  } finally {
    ...
  }
};
```

Then `synchronizeOnce()` checks the dirty views.

```ts
private synchronizeOnce(): void {
  ...

  if (this.dirtyFlags & ApplicationRefDirtyFlags.ViewTreeAny) {
    ...

    for (let {_lView} of this.allViews) {
      if (!useGlobalCheck && !requiresRefreshOrTraversal(_lView)) {
        continue;
      }

      const mode =
        useGlobalCheck && !this.zonelessEnabled
          ? ChangeDetectionMode.Global
          // In zoneless mode, Angular uses targeted checking.
          : ChangeDetectionMode.Targeted;

      detectChangesInternal(_lView, mode);
    }
  }

  ...
}
```

In zoneless mode, Angular tries to check only the views that were marked or affected by reactive changes.

### Angular Refreshes the View

Finally, Angular enters render3 Change Detection.

```ts
export function detectChangesInternal(lView: LView, mode = ChangeDetectionMode.Global) {
  ...

  try {
    detectChangesInViewWhileDirty(lView, mode);
  } finally {
    ...
  }
}
```

Inside that flow, Angular decides whether the view should refresh.

```ts
function detectChangesInView(lView: LView, mode: ChangeDetectionMode) {
  ...

  shouldRefreshView ||= !!(flags & LViewFlags.RefreshView);
  shouldRefreshView ||= !!(consumer?.dirty && consumerPollProducersForChange(consumer));

  ...

  if (shouldRefreshView) {
    refreshView(tView, lView, tView.template, lView[CONTEXT]);
  }
}
```

This is where the DOM update finally happens. The short flow is:

```text
signal / input / listener / markForCheck
-> notify scheduler
-> schedule tick
-> ApplicationRef._tick()
-> targeted Change Detection
-> refreshView()
-> DOM updated
```

## Compatibility with Legacy Projects

Apps that already use `ChangeDetectionStrategy.OnPush` often need fewer changes. The reason is simple: `OnPush` apps usually already use explicit notification mechanisms when they update values from async events. For example, they may use `markForCheck()`, `AsyncPipe`, or signals.

```ts
@Component({
  selector: 'app-user',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<p>{{ userName }}</p>`
})
export class UserComponent {
  userName = 'Loading...';

  constructor(private cdr: ChangeDetectorRef, private userService: UserService) {}

  ngOnInit() {
    this.userService.getUser().subscribe(user => {
      this.userName = user.name;

      // OnPush code often already has this line.
      // It also makes the component compatible with zoneless Change Detection.
      this.cdr.markForCheck();
    });
  }
}
```

If the app uses `AsyncPipe`, Angular also calls `markForCheck()` for you when the observable emits.

```ts
@Component({
  selector: 'app-user',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<p>{{ userName$ | async }}</p>`
})
export class UserComponent {
  userName$ = this.userService.getUserName();

  constructor(private userService: UserService) {}
}
```

Apps that do not use `OnPush` may need more changes. In a Zone.js app, this code can work because Zone.js schedules Change Detection after the HTTP callback. In a zoneless app, this update does not notify Angular by itself.

```ts
@Component({
  selector: 'app-user',
  template: `<p>{{ userName }}</p>`
})
export class UserComponent {
  userName = 'Loading...';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUser().subscribe(user => {
      // In zoneless mode, this field update alone may not be enough.
      this.userName = user.name;
    });
  }
}
```

To make it compatible, use one of Angular's notification mechanisms.

```ts
ngOnInit() {
  this.userService.getUser().subscribe(user => {
    this.userName = user.name;
    this.cdr.markForCheck();
  });
}
```

Or move the state to a signal.

```ts
userName = signal('Loading...');

ngOnInit() {
  this.userService.getUser().subscribe(user => {
    this.userName.set(user.name);
  });
}
```

So `OnPush` is not strictly required for zoneless. But it is a recommended step because it makes missing notifications easier to find before removing Zone.js. Components using the default strategy can still work, as long as they notify Angular when Change Detection needs to run.

## Conclusion

Zoneless Change Detection means Angular does not depend on Zone.js to schedule UI updates. Instead, Angular uses clear notifications from signals, inputs, listeners, and `markForCheck()`.

In this article, we had a quick look about **Zoneless Change Detection** and **how Angular updates the DOM without Zone.js**.

Hope you find this article valuable. If you have any questions about this topic or Angular, feel free to DM me via [Facebook Messenger](http://m.me/AndyTu.Hoang/ "Tu Hoang facebook messenger").
