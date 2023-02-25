# What is NgZone and How it trigger Change Detection In Angular

Angular has a mechanism automatic detect state changed and update your view, it is Change Detection(CD). The secret behind CD is **NgZone**. In this article, we will explore about **NgZone** and how it work in Angular.  

According to Angular Document, Angular will automatically trigger CD whenever it think application state maybe changed. Typically, updates occur by one of following reasons: 
1. Component initialization.  
2. The DOM event listener.  
3. HTTP Data Request.  
4. Invoke some macroTasks such as setTimeout() or setInterval().  
5. Invoke some microTasks such as Promise.then().
6. Other async operations like WebSocket.onmessage() and Canvas.toBlob().  

You can see Angular trigger ChangeDetection when Component initialize or Some Asynchronous Events occur. When Angular application initialize, Angular will trigger CD in bootstrap function. We will explore detail about this in another article. In this is article, we will focus on the second reason that make Angular trigger ChangeDetection: "Some Asynchronous Events occur".  
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

NgZone expose property **onMicrotaskEmpty**, it is a EventEmitter. This event will emit new value whenever some asynchronous event which run inside Angular Zone completed. Now, take a look to **ApplicationRef**

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
In **Tick()**, it invoke **view.detectChanges()**. And this is how **ngZone** trigger Angular Change Detection.  

Diagram below illustrates what happen when some asynchronous event occurs.  
![CD diagram](content/images/what-is-ngzone-and-how-it-trigger-change-detection/diagram.png "CD diagram")


In this article, we had a quick look about **NgZone** and **how it trigger Angular Change Detection**. In next article, we will explore more detail about **NgZone** with methods in it. 
Hope you find this article valuable. If you have any questions about this topic or Angular, feel free to DM me via [Facebook Messenger](http://m.me/AndyTu.Hoang/ "Tu Hoang facebook messenger").
