# Deep understanding about Expression has changed after it was checked

**ExpressionChangedAfterItHasBeenCheckedError** is the error that a lot of Angular developers will meet in development process. In this article, we will explore why Angular throw this error? And how to resolve this?

> Demo in this article was run in Angular 14 which use IVy compiler. If you use Angular version before 10 that use ViewEngine, some of the explanation may not work as explained.

## Where the error occurs?

Here is the example that is already throwing this error. 

```
@Component({
  selector: 'app-root',
  template: '{{value}}',
})
export class AppComponent implements AfterViewInit {
  value!: number
  ngAfterViewInit(): void {
    this.value = 1
  }
}
```
Look at the console. 

![ExpressionChangedAfterItHasBeenCheckedError console](content/images/deep-understanding-about-expression-has-changed-after-it-was-checked/error.JPG "ExpressionChangedAfterItHasBeenCheckedError console")

You can see where this error was thrown. It thrown from **throwErrorIfNoChangesMode** which is called by **bindingUpdated()**. Let's take a look to **bindingUpdated()** in @Angular/Core.  

```
export function bindingUpdated(lView: LView, bindingIndex: number, value: any): boolean {
  ngDevMode && assertNotSame(value, NO_CHANGE, 'Incoming value should never be NO_CHANGE.');
  ngDevMode &&
      assertLessThan(bindingIndex, lView.length, `Slot should have been initialized to NO_CHANGE`);
  const oldValue = lView[bindingIndex];

  if (Object.is(oldValue, value)) {
    return false;
  } else {
    if (ngDevMode && isInCheckNoChangesMode()) {
      // View engine didn't report undefined values as changed on the first checkNoChanges pass
      // (before the change detection was run).
      const oldValueToCompare = oldValue !== NO_CHANGE ? oldValue : undefined;
      if (!devModeEqual(oldValueToCompare, value)) {
        const details =
            getExpressionChangedErrorDetails(lView, bindingIndex, oldValueToCompare, value);
        throwErrorIfNoChangesMode(
            oldValue === NO_CHANGE, details.oldValue, details.newValue, details.propName);
      }
      // There was a change, but the `devModeEqual` decided that the change is exempt from an error.
      // For this reason we exit as if no change. The early exit is needed to prevent the changed
      // value to be written into `LView` (If we would write the new value that we would not see it
      // as change on next CD.)
      return false;
    }
    lView[bindingIndex] = value;
    return true;
  }
}
```

**bindingUpdated()** will be called after **ngAfterContentChecked** and after **ngAfterViewChecked** on every change detection(CD) run. The different thing of each times this function running is when it run after **ngAfterContentChecked** the **isInCheckNoChangesMode()** is **false**, but **true** if it run after **ngAfterViewChecked**. And **ExpressionChangedAfterItHasBeenCheckedError** has possibility be thrown only when `` !Object.is(oldValue, value) && ngDevMode && isInCheckNoChangesMode() && !devModeEqual(oldValueToCompare, value) `` is **true**. So we can conclude that this error will only occur when **data binding is changed** after **ngAfterContentChecked()**, and also it only in **development mode**.  


## Why Angular throw this error?
 
Look at the example, we can see the data binding is changed 2 times in 1 time CD run. And in the 2nd CD running, value of your data binding in TS class would not be updated in template, obviously it make your data is not consistent between template and TS class.  
**Note:** Sometimes when you see this error, you will see data display in your view consistent with data in TS class. The reason why is after Angular run the CD that throw this error, something trigger your application run CD again, it's maybe another Asynchronous Task..., and it make your data consistent.


## How to fix that?

Often, the fix is to use the right change detection hook to update data binding. For example, in our example we can init data in **ngOnInit**.  
```
@Component({
  selector: 'app-root',
  template: '{{value}}',
})
export class AppComponent implements OnInit {
  value!: number
  ngOnInit(): void {
    this.value = 1
  }
}
```
Beside, if you search in the google you will find 2 solutions to fix this error - asynchronous property update and forcing additional change detection cycle. Both work ok, however I don't recommend using them but rather redesign your application. But I will still explain why they work in this article.  
As you know, you will meet that error when in **bindingUpdated()** run after **ngAfterViewChecked**, you data binding is changed. So the main idea of both solutions I mentioned above is to not change the data binding in **bindingUpdated()** run after **ngAfterViewChecked**.

#### Asynchronous property update

```
@Component({
  selector: 'app-root',
  template: '{{value}}',
})
export class AppComponent implements AfterViewInit {
  value!: number;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.value = 1;
    })
  }
}
```

**setTimeout** is a macro-task, so ``this.value = 1`` will be executed after all synchronous function. It means when **bindingUpdated()** run after **ngAfterViewChecked** your data binding ``value`` is not changed and obviously Angular will not throw the error. The ``value`` will be updated in next time CD run. Also you can use this solution with other asynchronous task like **Promise**, **XHR request**,... 


#### Forcing additional change detection cycle

```
@Component({
  selector: 'app-root',
  template: '{{value}}',
})
export class AppComponent implements AfterViewInit {
  private readonly cdr = inject(ChangeDetectorRef);
  value!: number

  ngAfterViewInit(): void {
    this.value = 1;
    this.cdr.detectChanges();
  }
}
```

**bindingUpdated()** can be run immediately when you call Change Detection by using ChangeDetectorRef. So in the above example, **bindingUpdated()** will run after ``value`` is updated in **ngAfterViewInit**. Because **bindingUpdated()** run in **ngAfterViewInit**, Angular will not throw the error despite of data binding changing.  
**Note**: With this solution, **bindingUpdated()** still auto run after **ngAfterViewChecked**, but ``Object.is(oldValue, value)`` is true.

## Conclusion
**NG0100: Expression has changed after it was checked** will be thrown when an expression value has been changed after change detection has completed. Angular only throws this error in development mode. This error commonly occurs when you've added template expressions or have begun to implement lifecycle hooks like ngAfterViewInit or ngOnChanges. It is also common when dealing with loading status and asynchronous operations, or when a child component changes its parent bindings.  
In this article, I showed you some solutions to fix it and explained why it work. Hope you find this article valuable. If you have any questions about this topic or Angular, feel free to DM me via [Facebook Messenger](http://m.me/AndyTu.Hoang/ "Tu Hoang facebook messenger").
