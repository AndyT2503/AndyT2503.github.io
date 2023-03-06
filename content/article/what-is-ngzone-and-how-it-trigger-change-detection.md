# What is NgZone and How it trigger Change Detection In Angular

Angular has a mechanism automatic detect state changed and update your view, it is Change Detection(CD). The secret behind CD is **NgZone**. In this article, we will explore about **NgZone** and how it work in Angular.

According to Angular Document, Angular will automatically trigger CD whenever it think application state maybe changed. Typically, updates occur by one of following reasons:

1. Component initialization.
2. The DOM event listener.
3. HTTP Data Request.
4. Invoke some macroTasks such as setTimeout() or setInterval().
5. Invoke some microTasks such as Promise.then().
6. Other async operations like WebSocket.onmessage() and Canvas.toBlob().

Beside above reasons, when Angular application bootstrap, it will trigger CD when invoke **_loadComponent()** from **bootstrapApplication()** (standalone API) or **bootstrapModule()** (ngModule). But we will skip it in this article because it is not related with ngZone.  

```
private _loadComponent(componentRef: ComponentRef<any>): void {
  this.attachView(componentRef.hostView);
  this.tick(); //This function trigger CD
  this.components.push(componentRef);
  // Get the listeners lazily to prevent DI cycles.
  const listeners =
      this._injector.get(APP_BOOTSTRAP_LISTENER, []).concat(this._bootstrapListeners);
  listeners.forEach((listener) => listener(componentRef));
}
```
Get back to 6 reasons above, from the 2nd to 6th reason, we can easily recognize they are asynchronous tasks. But what about the 1st reason? When does a component initialize? It is usually the following cases: after router navigation (async process), after clicking some button or call some api then show component through some structural directives or dynamic rendering by ViewContainerRef. So the 1st reason actually is a asynchronous event. And we can conclude that Angular will trigger CD whenever an asynchronous event occur.  
As we know it, Asynchronous Event is the event which will complete in the future. So of course Angular can not really know when it complete to run CD. This is where **NgZone** comes to play with the supporting form **Zone.js**.

## What is Zone.js and NgZone?

In general, **Zone.js** provide a mechanism to intercept the scheduling and calling of asynchronous operations. Zones are composed in a hierarchical parent-child relationship. At the start the browser runs in a special root zone. You can create new Zone by invoke **fork()** from any Zone that existing. Angular implements NgZone service that forks a child zone (Angular Zone) and subscribes to notifications from this zone.

```
export class NgZone {
  constructor(...) {
    forkInnerZoneWithAngularBehavior(self);
  }
}

function forkInnerZoneWithAngularBehavior(zone: NgZonePrivate) {
  zone._inner = zone._inner.fork({ ... });
}
```

![zone hierarchy](content/images/what-is-ngzone-and-how-it-trigger-change-detection/default.jpg "zone hierarchy")

## How NgZone trigger Change Detection?

```
function forkInnerZoneWithAngularBehavior(zone: NgZonePrivate) {
  const delayChangeDetectionForEventsDelegate = () => {
    delayChangeDetectionForEvents(zone);
  };
  zone._inner = zone._inner.fork({
    name: 'angular',
    properties: <any>{'isAngularZone': true},
    onInvokeTask:
        (delegate: ZoneDelegate, current: Zone, target: Zone, task: Task, applyThis: any,
         applyArgs: any): any => {
          try {
            onEnter(zone);
            return delegate.invokeTask(target, task, applyThis, applyArgs);
          } finally {
            if ((zone.shouldCoalesceEventChangeDetection && task.type === 'eventTask') ||
                zone.shouldCoalesceRunChangeDetection) {
              delayChangeDetectionForEventsDelegate();
            }
            onLeave(zone);
          }
        },

    onInvoke:
        (delegate: ZoneDelegate, current: Zone, target: Zone, callback: Function, applyThis: any,
         applyArgs?: any[], source?: string): any => {
          try {
            onEnter(zone);
            return delegate.invoke(target, callback, applyThis, applyArgs, source);
          } finally {
            if (zone.shouldCoalesceRunChangeDetection) {
              delayChangeDetectionForEventsDelegate();
            }
            onLeave(zone);
          }
        },

    onHasTask:
        (delegate: ZoneDelegate, current: Zone, target: Zone, hasTaskState: HasTaskState) => {
          delegate.hasTask(target, hasTaskState);
          if (current === target) {
            // We are only interested in hasTask events which originate from our zone
            // (A child hasTask event is not interesting to us)
            if (hasTaskState.change == 'microTask') {
              zone._hasPendingMicrotasks = hasTaskState.microTask;
              updateMicroTaskStatus(zone);
              checkStable(zone);
            } else if (hasTaskState.change == 'macroTask') {
              zone.hasPendingMacrotasks = hasTaskState.macroTask;
            }
          }
        },

    onHandleError: (delegate: ZoneDelegate, current: Zone, target: Zone, error: any): boolean => {
      delegate.handleError(target, error);
      zone.runOutsideAngular(() => zone.onError.emit(error));
      return false;
    }
  });
}
```
In **forkInnerZoneWithAngularBehavior()**, you can see it have something such as: **onInvokeTask**, **onInvoke**, **onHasTask**, **onHandleError**. They are **Zone.js lifecycle hooks** which will be trigger by specific asynchronous operations.

| Hooks            | Details |
|:---              |:---     |
| `onScheduleTask` | Triggers when a new asynchronous task is scheduled, such as when you call `setTimeout()`.                                                                                                                                                         |
| `onInvokeTask`   | Triggers when an asynchronous task is about to execute, such as when the callback of `setTimeout()` is about to execute.                                                                                                                          |
| `onHasTask`      | Triggers when the status of one kind of task inside a zone changes from stable to unstable or from unstable to stable. A status of "stable" means there are no tasks inside the zone, while "unstable" means a new task is scheduled in the zone. |
| `onInvoke`       | Triggers when a synchronous function is going to execute in the zone.                                                                                                                                                                             |
| `onHandleError`  | Handle errors of  asynchronous operations. |

In **onInvokeTask**, **onInvoke**, **onHasTask** we need to focus on two methods: **onLeave(zone)** and **checkStable(zone)**. Now, let explore what are they?
```
function onLeave(zone: NgZonePrivate) {
  zone._nesting--;
  checkStable(zone);
}
```

```
function checkStable(zone: NgZonePrivate) {
  if (zone._nesting == 0 && !zone.hasPendingMicrotasks && !zone.isStable) {
    try {
      zone._nesting++;
      zone.onMicrotaskEmpty.emit(null);
    } finally {
      zone._nesting--;
      if (!zone.hasPendingMicrotasks) {
        try {
          zone.runOutsideAngular(() => zone.onStable.emit(null));
        } finally {
          zone.isStable = true;
        }
      }
    }
  }
}
```
What is **checkStable(zone)**? Why it is invoked after all? Method's name was self-explanation. It will check zone status whether it stable or not. And whenever it is unstable but doesn't have any pending async task (**!zone.hasPendingMicrotasks**). It will `zone.onMicrotaskEmpty.emit(null)`. 


Now, take a look to **ApplicationRef** which is instantiated when we open some Angular application

```
export class ApplicationRef {
  constructor(...) {
    this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe({
      next: () => {
        this._zone.run(() => {
          this.tick();
        });
      }
    });
  }
}
```

In constructor, AppRef subscribe to onMicrotaskEmpty event. Whenever this event emit new value, **tick()** is invoked.

```
tick(): void {
  NG_DEV_MODE && this.warnIfDestroyed();
  if (this._runningTick) {
    throw new RuntimeError(
        RuntimeErrorCode.RECURSIVE_APPLICATION_REF_TICK,
        ngDevMode && 'ApplicationRef.tick is called recursively');
  }

  try {
    this._runningTick = true;
    for (let view of this._views) {
      view.detectChanges();
    }
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      for (let view of this._views) {
        view.checkNoChanges();
      }
    }
  } catch (e) {
    // Attention: Don't rethrow as it could cancel subscriptions to Observables!
    this._zone.runOutsideAngular(() => this._exceptionHandler.handleError(e));
  } finally {
    this._runningTick = false;
  }
}
```
`this._views` is the list of view represent for root components (provide multiple root components by provide an array of component for **bootstrap** property in **@ngModule**). **view.detectChanges()** means that it will trigger CD for root component and then for all component in **Change Detection tree**.  And this is how **ngZone** trigger Angular Change Detection.

Diagram below illustrates what happen when some asynchronous event occurs.  
![CD diagram](content/images/what-is-ngzone-and-how-it-trigger-change-detection/diagram.png "CD diagram")


In this article, we had a quick look about **NgZone** and **how it trigger Angular Change Detection**. In next article, we will explore **Can Angular work without ngZone?**.
Hope you find this article valuable. If you have any questions about this topic or Angular, feel free to DM me via [Facebook Messenger](http://m.me/AndyTu.Hoang/ "Tu Hoang facebook messenger").
