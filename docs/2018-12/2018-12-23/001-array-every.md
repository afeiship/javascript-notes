# array-every:

```js
// 这个循环执行到 null 这里就会 break，直接返回结果
var arr = [1,2,3,null,4,5,6]
arr.every(item=>{
    console.log(item)
    return !!item
})
```