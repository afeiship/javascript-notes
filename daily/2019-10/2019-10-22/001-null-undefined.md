# null / undefined

- 当你没有提前使用var、let或const声明变量，就为一个变量赋值时，该变量是`未声明变量`（undeclared variables）。
- 未声明变量会脱离当前作用域，成为 `全局作用域下定义的变量`。
- 在严格模式下，给未声明的变量赋值，`会抛出ReferenceError错误`。

## judgement
和使用全局变量一样，使用未声明变量也是非常不好的做法，应当尽可能避免。
要检查判断它们，需要将用到它们的代码放在try/catch语句中。

```js
function foo() {
  x = 1; // 在严格模式下，抛出 ReferenceError 错误
}

foo();
console.log(x); // 1
```

