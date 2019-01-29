# while or for:

```js
var fn1 = function(){
    console.log('fn1')
}
var fn2 = function(){
    console.log('fn2')
}

var listeners = [fn1,fn2];

// 写法1：
var listener, i = 0;
while(listener = listeners[i++]) listener();

// 写法2：
for (var i = 0; i < listeners.length; i++) {
    var listener = listeners[i];
    listener();
}
```