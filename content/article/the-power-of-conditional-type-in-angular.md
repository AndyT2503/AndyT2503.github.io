# The power of conditional type in Angular

**Conditional Type** is the utility type of Typescript. It's really a intensive type. But do you know how to take the power of it in Angular?

## What is Conditional Type?

Conditional types allow developers to use conditions when introducing their types. Let's take a look to example bellow

```
interface Animal {
}
interface Dog extends Animal {
}

type Ex1 = Dog extends Animal ? number : string; //type of Ex1 = number

type Ex2 = RegExp extends Animal ? number : string; // type of Ex2 = string
```

Here, types **Ex1** and **Ex2** are decided by the condition of whether they are extending the type **Animal** or not. As the type Dog is extending the Animal type, the condition evaluates as true, and the **Ex1** type is evaluated to the type number. For **Ex2**, since the **RegExp** type is not extending the **Animal** type, the condition evaluates as false. Therefore, the **Ex2** type is evaluated to the type string.

## Conditional Type in Angular

Actually, I don't see **Conditional Type** use frequently in Angular repositories that I have read on Github or worked in before. But I explored some case where **Conditional Type** is very useful.

### Selector of @ngrx/component-store

When you want read data from component-store, you need to use `select` method.

```
export interface MoviesState {
  movies: Movie[];
}

@Injectable()
export class MoviesStore extends ComponentStore<MoviesState> {

  constructor() {
    super({movies:[]});
  }

  readonly movies$: Observable<Movie[]> = this.select(state => state.movies);
}
```

If you want to read multiple different state, you have to create a lot boilerplate code. **Conditional Type** and **Proxy** will help you solve this problem.  
Main idea of this solution is that I will create a utility function which take component-store and return a object that contain **selector** of all properties declared in component-store's state.

```
function getSelector<T>(store: ComponentStore<T>) {
    //logic get selector
}

interface AuthState {
    user: User;
    isAuthenticated: boolean;
}

export class AuthStore extends ComponentStore<AuthState> {
    /**
     * selectors = {
     *    user$: this.select(s => s.user),
     *    isAuthenticated$: this.select(s => s.isAuthenticated)
     * } 
    */
    readonly selectors = getSelector(this);
}

```
