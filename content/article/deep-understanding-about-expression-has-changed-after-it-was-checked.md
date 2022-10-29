# Deep understanding about Expression has changed after it was checked

**ExpressionChangedAfterItHasBeenCheckedError** is the error that a lot of Angular developers will meet in development process.  
In this article, we will explore why Angular throw this error? And how to resolve this?

> Demo in this article was run in Angular 14 which use IVy compiler. If you use Angular version   
> before 10 that use ViewEngine, some of the explanation may not work as explained.

## Where the error occurs

Here is the example that is already throwing this error.  
Look at the console. You can see where this error was thrown. It thrown from **bindingUpdated()** function. So let's take the  
look to this function. As you can see this function will throw **ExpressionChangedAfterItHasBeenCheckedError**  
in line ... and I


