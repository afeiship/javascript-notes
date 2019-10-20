# what is iife
- 请解释下面代码为什么不能用作 IIFE：function foo(){ }();，需要作出哪些修改才能使其成为 IIFE？


## IIFE
IIFE（Immediately Invoked Function Expressions）代表立即执行函数。 

JavaScript 解析器将 function foo(){ }();解析成function foo(){ }和();。其中，前者是函数声明；后者（一对括号）是试图调用一个函数，却没有指定名称，因此它会抛出Uncaught SyntaxError: Unexpected token )的错误。

修改方法是：再添加一对括号，形式上有两种：(function foo(){ })()和(function foo(){ }())。以上函数不会暴露到全局作用域，如果不需要在函数内部引用自身，可以省略函数的名称。

你可能会用到 void 操作符：void function foo(){ }();。但是，这种做法是有问题的。表达式的值是undefined，所以如果你的 IIFE 有返回值，不要用这种做法。例如：

```js
// Don't add JS syntax to this code block to prevent Prettier from formatting it.
const foo = void function bar() { return 'foo'; }();

console.log(foo); // undefined
```

## resources
http://lucybain.com/blog/2014/immediately-invoked-function-expression/
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void
