# seal/frozen 区别：


## Object.seal:
> 让一个对象密封，并返回被密封后的对象。密封对象是指那些不能添加新的属性，不能删除已有属性，以及不能修改已有属性的可枚举性、可配置性、可写性，但可以修改已有属性的值的对象。

```js
// 1. 不能添加新的属性
// 2. 但可以对 name 进行修改
var obj = {name: 'John'}
 
// 密封
Object.seal(obj)
 
// 不能添加新属性
obj.age = 30
console.log(obj.age) // undefined
```
## Object.isSealed
> 判断一个对象是否是密封的（sealed）

## Object.freeze
> 这个方法比 Object.seal 更绝，冻结对象是指那些不能添加新的属性，不能修改已有属性的值，不能删除已有属性，以及不能修改已有属性的可枚举性、可配置性、可写性的对象。也就是说，这个对象永远是不可变的。


```js
var obj = {name: 'John'}
Object.freeze(obj)
obj.age = 30
console.log(obj.age) // undefind
```
## Object.isFrozen
> 判断一个对象是否被冻结（frozen）