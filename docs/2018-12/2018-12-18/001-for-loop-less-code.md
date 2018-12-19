# for/while less code:

## 关于事件：

## 用 while 的写法：

```js
var listeners = [
  function() {
    console.log(1);
  },
  function() {
    console.log(2);
  },
  function() {
    console.log(3);
  }
];

// while:
var i = 0, fn1;
while ((fn1 = listeners[i++])) fn1();

// for:
for (var j = 0, fn2; (fn2 = listeners[j++]); ) fn2();
```
