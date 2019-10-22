# attribute vs property


- “Attribute” 是在 HTML 中定义的，而 “property” 是在 DOM 上定义的。
- 为了说明区别，假设我们在 HTML 中有一个文本框：<input type="text" value="Hello">。

```js
const input = document.querySelector('input');
console.log(input.getAttribute('value')); // Hello
console.log(input.value); // Hello

// 但是在文本框中键入“ World!”后:
console.log(input.getAttribute('value')); // Hello
console.log(input.value); // Hello World!
```