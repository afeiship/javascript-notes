# configurable 作用：
> configurable是可配置的意思，如果值为true代表可以删除，即可以delete 对象.属性，如果值为false，则不能删除

```js
var obj = {}
Object.defineProperty(obj,'key1',{
    value:'value1',
    configurable:true
})
Object.defineProperty(obj,'key2',{
    value:'value1',
    configurable:false
})


console.log(obj)

delete obj.key1 // true
delete obj.key2 // false
```
