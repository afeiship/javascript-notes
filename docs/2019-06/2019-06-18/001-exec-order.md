# exec order

```js
// https://www.cnblogs.com/mengfangui/p/8670698.html
new Promise(()=>{
    console.log('2222')
});

setTimeout(()=>{
    console.log('3333');
});

Promise.resolve().then(()=>{
    console.log('44444')
})

console.log('111');
```