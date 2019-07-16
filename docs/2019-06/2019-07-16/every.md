# every
> every/some 等会自动 break，短路运算，节省性能。

```js
var arr = [1,2,3,4,5,6];
arr.every(item=>{
    console.log(item);
    return item>4
})

// 1
// false
```

