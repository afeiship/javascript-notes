# event loop

## js 语言层面
### all main stack
```js
function multiply(n1,n2){
    return n1 * n2;
}

function square(n){
    return multiply(n,n)
}

function printSquare(){
    const s1 = square(10);
    console.log(s1);
}
```

### sync stack
- link ruby lang
```js
const foo = $.getSync('1.html');
const bar = $.getSync('2.html');
const qux = $.getSync('3.html');

console.log(foo);
console.log(bar);
console.log(qux);
```

## js + browser 层面
- MainStack: 这个是顺序执行的
- CallbackQueue: 
- RenderQueue

![](https://tva1.sinaimg.cn/large/006y8mN6gy1g86ztdb4k1j30xw0kq42z.jpg)


## 解释一下这一段代码 
1. MainStack Code
2. SetTimeout Code

```js
console.log('hello');
setTimeout(()=>{
    console.log('where am i');
},1000);
console.log('world');
```
> FEI 的解释 -- 代码的执行过程。

1. 依次输出 
   1. hello 
   2. world 
   3. where am i
2. 执行过程如下，代码顺序执行(有函数，会预执行)
   1. 执行第1句，直接将代码扔进 main stack 中，执行，输出 hello
   2. 执行第2句， `setTimeout` ，将 `setTimeout(cb,1000);` 扔到 `webapis` 的池子中，等到 timer 到时间
   3. 执行第3句，`console.log('world')` ，同第1句，直接输出 world
   4. timer 到时间，将 cb 扔到 `taskQueue` 中去
   5. 当 `event_loop` 到下一个循环的时候，即会去检测 `taksQueue` 中有没有可执行的代码
   6. 这个时候，`1000/60`（每刷的刷新率），决定了浏览器的最小执行时间间隔，这个就是那个常见问题的答案了
   7. 这个时候，event_looop 会把 queue 中的代码扔到 main stack 中继续执行

## 解释一下带事件的代码
```js
console.log('hello');
$.on("click",()=>{
    console.log('clicked!');
})
console.log('world');
```
1. 执行输出 hello
2. 将 $.on 加到一个 webapi 的一个 observer 中去。
3. 当用户点击的时候，这个 webapis 的 observer 就会被 notify
4. 从而将 click 的 handler扔到  taskQueue 中去
5. 等 event_loop 触发的时候，即会把 hadnler 扔到 mainStack 中去执行
6. 执行 handler 的代码
7. 执行 world 输出


## micro/macro tasks
```js
setTimeout(() => console.log("timeout"));
Promise.resolve()
  .then(() => console.log("promise"));

console.log("code");
```

## micro/macro tasks
```js
console.log('script start');

setTimeout(() => {
    console.log('setTimeout');
}, 0);

Promise.resolve().then(() => {
    console.log('promise1');
}).then(() => {
    console.log('promise2');
});

console.log('script end');
```

## resources
- https://javascript.info/event-loop
- https://juejin.im/entry/5a7864d4f265da4e914b3dc7
- https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html