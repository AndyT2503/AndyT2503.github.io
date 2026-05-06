Starting from Angular 17, Signals became a stable API and introduced a new way to build reactive applications in Angular alongside RxJS. After this release, Angular sequentially introduced new signal-based APIs such as `input`, `output`, and others, enabling developers to build fully signal-based applications.

However, one of the most important parts of Angular — **Reactive Forms** — did not yet have a Signal-compatible API.

Fortunately, we no longer have to wait. From Angular 21, Angular introduced **Signal Forms** in ***developer preview***, providing an alternative and modern approach to building forms with Signals.

In this article, I will briefly introduce some important functions you need to know when using **Signal Forms**.

## Signal Forms

Signal Forms use a Signal-based model as the foundation and derive reactive form fields from it. Instead of manually creating `FormGroup` and `FormControl`, the form structure is generated automatically from a Signal.


```ts
import {Component, signal} from '@angular/core';
import {form, FormField} from '@angular/forms/signals';

interface LoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  imports: [FormField],
  template: `
  <form (submit)="onSubmit($event)">
    <input type="email" [formField]="loginForm.email" />
    <input type="password" [formField]="loginForm.password" />
    <button type="submit">Submit</button>
  </form>
  `,
})
export class LoginComponent {
  readonly loginModel = signal<LoginData>({
    email: '',
    password: '',
  });
  readonly loginForm = form(this.loginModel);

  onSubmit(e: Event): void {
    e.preventDefault();
    const loginData = this.loginForm().value();
  }
}
```

## Validation

#### Basic validation
Validation in Signal Forms is defined through a schema function passed as the second argument to `form()`.

The schema function receives a `SchemaPathTree` object that lets you define your validation rules:

```ts
readonly loginForm = form(this.loginModel, (schemaPath) => {
  required(schemaPath.email, {message: 'Email is required'});
  email(schemaPath.email, {message: 'Enter a valid email address'});
  required(schemaPath.password, {message: 'Password is required'});
});
```

Angular provides several built-in validation rules for Signal Forms:

- [`required()`](https://angular.dev/guide/forms/signals/validation#required) – ensures the field has a value  
- [`email()`](https://angular.dev/guide/forms/signals/validation#email) – validates email format  
- [`min() and max()`](https://angular.dev/guide/forms/signals/validation#min-and-max) – validate numeric range  
- [`minLength() and maxLength()`](https://angular.dev/guide/forms/signals/validation#minlength-and-maxlength) – validate value length  
- [`pattern()`](https://angular.dev/guide/forms/signals/validation#pattern) – validates value against a regex pattern  


#### Custom Validation

#### Using validate()

The `validate()` function creates custom validation rules. It receives a validator function that accesses the field context and returns:

| Return Value          | Meaning                              |
|-----------------------|--------------------------------------|
| Error object          | Validation failed                    |
| `null` or `undefined` | Validation passed (no errors)       |



```ts
readonly loginForm = form(this.loginModel, (schema) => {
  validate(schema.email, ({ value }) => {
    const email = value();

    if (!email.includes('@')) {
      return {
        kind: 'email',
        message: 'Please enter a valid email address',
      };
    }

    return null;
  });
});
```

#### Using validateTree()

The `validateTree()` function allows you to create custom validation rules that can access and validate multiple related fields within the same form tree. It is especially useful when validation depends on the relationship between fields or when validation logic cannot be applied to a single field independently.

Unlike field-level validators, which only validate the value of one specific field, `validateTree()` operates at the form tree level and can:

- Read values from multiple fields
- Apply complex or conditional validation logic
- Assign validation errors to a specific field via `fieldTree`
- Support cross-field validation scenarios such as password confirmation, date comparison, or dependent inputs

```ts
interface User {
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormField, JsonPipe],
  template: `
    <form (submit)="onSubmit($event)">
      <div>
        <label>First Name</label>
        <input type="text" [formField]="userForm.firstName" />
      </div>

      <div>
        <label>Last Name</label>
        <input type="text" [formField]="userForm.lastName" />

        <!-- Error will appear here -->
        @if (userForm.firstName().touched()) {
          @if (userForm.lastName().errors(); as errors) {
            <div style="color:red">
              {{ errors[0].message }}
            </div>
          }
        }
      </div>

      <button type="submit">Submit</button>
    </form>

    <pre>{{ userModel() | json }}</pre>
  `,
})
export class UserFormComponent {

  readonly userModel = model<User>({
    firstName: '',
    lastName: '',
  });

  readonly userForm = form(this.userModel, (path) => {

    validateTree(path, (ctx) => {

      const firstName = ctx.valueOf(path.firstName);

      if (firstName.length < 5) {
        return {
          kind: 'minLength5',
          message: 'First name must be at least 5 characters',
          fieldTree: ctx.fieldTree.lastName,
        };
      }

      return null;

    });

  });

  onSubmit(e: Event) {
    e.preventDefault();
    console.log('LastName errors:', this.userForm.lastName().errors());
  }
}
```

#### Reusable validation rules

In addition to writing inline validation logic, Angular Signal Forms allows you to create reusable validation rules by wrapping the `validate()` function inside custom functions.

A reusable validator is a function that:

- Accepts a `SchemaPath` pointing to the field
- Optionally accepts configuration options
- Internally calls `validate()` to register the validation logic

Basic structure:

```ts
function customValidator(
  path: SchemaPath<string>,
  options?: { message?: string }
) {
  validate(path, ({ value }) => {

    // validation logic

    return null;

  });
}
```

```ts
function url(path: SchemaPath<string>, options?: {message?: string}) {
  validate(path, ({value}) => {
    try {
      new URL(value());
      return null;
    } catch {
      return {
        kind: 'url',
        message: options?.message || 'Enter a valid URL',
      };
    }
  });
}

interface UrlFormModel {
  website: string;
}

@Component({
  selector: 'app-url-form',
  standalone: true,
  imports: [FormField],
  template: `
    <form>
      <label>Website</label>
      <input type="text" [formField]="urlForm.website" />

      @if (urlForm.website().errors(); as errors) {
        <div style="color:red">
          {{ errors[0].message }}
        </div>
      }
    </form>
  `,
})
export class UrlFormComponent {

  readonly urlModel = model<UrlFormModel>({
    website: '',
  });

  readonly urlForm = form(this.urlModel, (schemaPath) => {

    url(schemaPath.website, {
      message: 'Please enter a valid website URL',
    });

  });

}
```

## Custom form control

One major advantage of Signal Forms compared to Reactive Forms is how much simpler it is to create custom form controls.

In Reactive Forms, creating a custom control requires implementing the `ControlValueAccessor` interface and registering it using the `NG_VALUE_ACCESSOR` provider. This process involves multiple methods such as `writeValue`, `registerOnChange`, `registerOnTouched`, and handling internal state synchronization. For beginners, this can be confusing and requires a significant amount of boilerplate code.

Signal Forms provides a much simpler and more intuitive approach. Instead of using `ControlValueAccessor`, you only need to implement the `FormValueControl<TValue>` interface (or `FormCheckboxControl` for checkbox-like controls). These interfaces define the required signals and properties that allow your component to communicate directly with the form system.

Once implemented, the `[formField]` directive automatically connects your custom control to the form. This approach removes the need for complex providers and lifecycle methods, making custom controls easier to build, easier to understand, and more aligned with the reactive nature of signals.

```ts
import {Component, model} from '@angular/core';
import {FormValueControl} from '@angular/forms/signals';
@Component({
  selector: 'app-basic-input',
  template: `
    <div class="basic-input">
      <input
        type="text"
        [value]="value()"
        (input)="value.set($event.target.value)"
        placeholder="Enter text..."
      />
    </div>
  `,
})
export class BasicInput implements FormValueControl<string> {
  /** The current input value */
  value = model('');
}
```

```ts
import {Component, model, ChangeDetectionStrategy} from '@angular/core';
import {FormCheckboxControl} from '@angular/forms/signals';
@Component({
  selector: 'app-basic-toggle',
  template: `
    <button type="button" [class.active]="checked()" (click)="toggle()">
      <span class="toggle-slider"></span>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicToggle implements FormCheckboxControl {
  /** Whether the toggle is checked */
  checked = model<boolean>(false);
  toggle() {
    this.checked.update((val) => !val);
  }
}
```

```ts
import {Component, signal, ChangeDetectionStrategy} from '@angular/core';
import {form, FormField, required} from '@angular/forms/signals';
import {BasicInput} from './basic-input';
import {BasicToggle} from './basic-toggle';
@Component({
  imports: [FormField, BasicInput, BasicToggle],
  template: `
    <form novalidate>
      <label>
        Email
        <app-basic-input [formField]="registrationForm.email" />
      </label>
      <label>
        Accept terms
        <app-basic-toggle [formField]="registrationForm.acceptTerms" />
      </label>
      <button type="submit" [disabled]="registrationForm().invalid()">Register</button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Registration {
  registrationModel = signal({
    email: '',
    acceptTerms: false,
  });
  registrationForm = form(this.registrationModel, (schemaPath) => {
    required(schemaPath.email, {message: 'Email is required'});
    required(schemaPath.acceptTerms, {message: 'You must accept the terms'});
  });
}
```

## Summary

Signal Forms introduces a modern and more intuitive way to build forms in Angular. Instead of managing `FormGroup`, `FormControl`, and complex control hierarchies manually, we now work directly with Signals as the single source of truth. The form structure is derived automatically, validation becomes more declarative, and custom controls are significantly easier to implement.

Although Signal Forms is still in developer preview, it clearly shows the future direction of Angular forms — simpler, more reactive, and more developer-friendly.

I hope this article helps you understand the core concepts of Signal Forms and gives you confidence to start experimenting with it in your projects.

If you have any questions about Signal Forms or Angular in general, feel free to DM me via [Facebook Messenger](http://m.me/AndyTu.Hoang/ "Tu Hoang facebook messenger").
