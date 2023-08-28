# The power of conditional type in Angular

**Conditional Type** is the utility type of Typescript. It's really useful. But do you know how to take the power of it in Angular?

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

