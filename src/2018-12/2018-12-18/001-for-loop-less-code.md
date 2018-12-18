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
var i = 0,
  listener;
while ((listener = listeners[i++])) listener();

// for:
for (var j = 0, fn; (fn = listeners[j++]); ) fn();
```
