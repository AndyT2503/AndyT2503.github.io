# The power of conditional type in Angular

**Conditional Type** is the utility type of Typescript. It's really an intensive type. But do you know how to take the power of it in Angular?

## What is Conditional Type?

**Conditional type** allow developers to use conditions when introducing their types. Let's take a look to example bellow.

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

Actually, I don't see **Conditional Type** use frequently in Angular repositories that I have read on Github or worked in before. But I explored some cases where **Conditional Type** is very useful.

### Selector of @ngrx/component-store

When you want to read data from component-store, you need to use `select` method.

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

If you want to read multiple different state, you have to create lot of boilerplate code. **Conditional Type** and **Proxy** will help you solve this problem.  
Main idea of this solution is that I will create a utility function which take component-store and return a object that contain **selector** of all properties declared in component-store's state.

```
function getSelectors<T extends ComponentStore<any>>(store: ComponentStore<T>) : StoreSelectors<T> {
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
    readonly selectors = getSelectors(this);
}

```
Firstly, we need to declare `StoreSelectors<T extends ComponentStore<any>>` by using **Conditional Type**

```
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
export type StoreState<TStore> = TStore extends ComponentStore<infer TState>
  ? TState
  : {};

export type StoreSelectors<TStore, TState = StoreState<TStore>> = {
  [TSelectorKey in keyof TState as `${TSelectorKey & string}$`]: Observable<
    TState[TSelectorKey]
  >;
};

//Example:
class SomeStore extends ComponentStore<{foo: string; bar: number}> {}

type StoreSelectors<SomeStore> = {
  foo$: Observable<string>;
  bar$: Observable<number>;
}
```
In the next step, I will use **Proxy** to implement `getSelectors<T extends ComponentStore<any>>(store: ComponentStore<T>)` function.

```
export function getSelectors<TStore extends ComponentStore<any>>(
  store: TStore,
): StoreSelectors<TStore> {
  return new Proxy({} as StoreSelectors<TStore>, {
    get(target, p, receiver) {
      const prop = p as string & keyof StoreSelectors<TStore>;  
      if (
        !prop.endsWith('$') &&
        target[prop] !== null
      ) {
        return Reflect.get(target, p, receiver);
      }
      const stateProp = prop.slice(0, -1);
      return (target[prop] = store.select(
        (s) => s[stateProp],
      ) as StoreSelectors<TStore>[string & keyof StoreSelectors<TStore>]);
    },
  });
}
```
Everything is done. You can create a new base ComponentStore class to use `getSelectors` more convenient.
```
export class ComponentStoreWithSelectors<
  TState extends object,
> extends ComponentStore<TState> {
  readonly selectors = getSelectors<ComponentStore<TState>>(this);
}
```
You can check full my implementation [here](https://github.com/AndyT2503/base-project/blob/v15/src/app/shared/utils/get-selectors.ts "getSelectors").

### Typed form group base on interface model

From Angular v14, Angular provides the FormGroup type for forms.
```
interface LoginForm {
    email: FormControl<string>;
    password: FormControl<string>;
}

const login = new FormGroup<LoginForm>({
    email: new FormControl('', {nonNullable: true}),
    password: new FormControl('', {nonNullable: true}),
});
```
Assume we have to send above form's value to api login, we will have some code like bellow.
```
interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({...})
class AuthService {
  private readonly httpClient = inject(HttpClient);
  login(request: LoginRequest) {
    return this.httpClient.post('api/login', request);
  }
}

@Component({...})
class LoginComponent {
  private readonly authService = inject(AuthService);
  loginForm = new FormGroup({
    //Declare like previous example
  })

  //handle submit login form value
  submit() {
    this.authService.login(this.loginForm.getRawValue()).subscribe();
  }
}
```

As you can see, we will have to declare two models `LoginForm` and `LoginRequest` even though they're almost similar. So I want to create a utility type that we can convert `LoginRequest` model to `LoginForm` model.

```
import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type TypedFormGroup<TFormData extends object> = FormGroup<{
  [TFormKey in keyof TFormData]: TFormData[TFormKey] extends Date
    ? FormControl<Date>
    : TFormData[TFormKey] extends Array<infer TItem>
    ? TItem extends Date
      ? FormControl<Date[]>
      : TItem extends object
      ? FormArray<TypedFormGroup<TItem>>
      : FormControl<TItem[]>
    : TFormData[TFormKey] extends object
    ? TypedFormGroup<TFormData[TFormKey]>
    : FormControl<TFormData[TFormKey]>;
}>;

//Now you can declare your login form with strict type like bellow
const loginForm: TypedFormGroup<LoginRequest> = new FormGroup({
  email: new FormControl('', {nonNullable: true}),
  password: new FormControl('', {nonNullable: true}),
}); 
```
It looks so nice. But what if you want to declare some key with different form type than declared in `TypedFormGroup`? So I will refactor `TypedFormGroup` a little bit.

```
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';

type StandardTypedForm<TForm> = [TForm] extends [Date]
  ? FormControl<Date>
  : [TForm] extends [Array<infer TItem>]
  ? TItem extends Date
    ? FormControl<Date[]>
    : TItem extends object
    ? FormArray<TypedFormGroup<TItem>>
    : FormControl<TItem[]>
  : [TForm] extends [object]
  ? TypedFormGroup<TForm>
  : FormControl<TForm>;

export type TypedFormGroup<
  TFormData extends object,
  TExceptionForm extends Partial<Record<keyof TFormData, AbstractControl>> = object,
> = TExceptionForm extends Partial<Record<keyof TFormData, AbstractControl>>
  ? FormGroup<{
      [TFormKey in keyof TFormData]: TExceptionForm[TFormKey] extends AbstractControl
        ? TExceptionForm[TFormKey]
        : StandardTypedForm<TFormData[TFormKey]>;
    }>
  : FormGroup<{
      [TFormKey in keyof TFormData]: StandardTypedForm<TFormData[TFormKey]>;
    }>;

// Example:
interface User {
  name: string;
  roles: string[];
}

//standard form type
const userForm: TypedFormGroup<User> = new FormGroup({
  name: new FormControl('', {nonNullable: true}),
  roles: new FormControl([''], {nonNullable: true})
});

//custom form type with roles is formArray
const customUserForm: TypedFormGroup<User, {
  roles: FormArray<FormControl<string>>
}> = new FormGroup({
  name: new FormControl('', {nonNullable: true}),
  roles: new FormArray([new FormControl('', {nonNullable: true})])
});
```

## Conclusion
**Conditional Type** is  really an intensive type of Typescript, but we haven't used it enough in Angular. In this article, we explored two use cases that we can use **Conditional Type** effectively in Angular. If you have any other use cases of **Conditional Type**, I'm looking to hear you via [Facebook Messenger](http://m.me/AndyTu.Hoang/ "Tu Hoang facebook messenger"). If you like this article, please give me 1 star for this [personal website](https://github.com/AndyT2503/AndyT2503.github.io "personal website").
