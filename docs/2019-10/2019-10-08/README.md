# object-ext
- https://www.cnblogs.com/snandy/p/5278474.html


## Object.preventExtensions
> 阻止对象扩展，让一个对象变的不可扩展，也就是永远不能再添加新的属性

```js
var obj = {name: 'John'}
 
// 又添加一个属性 age
obj.age = 30
 
// 又添加一个方法
obj.setAge = function(a) {
    this.age = a
}
```

## ES5 的 Object.preventExtensions 
- 可以阻止给对象添加新属性
- Object.isExtensible

```js
var obj = { name: 'John' };
 
// 阻止对象扩展
Object.preventExtensions(obj);
 
// 添加新属性
obj.age = 30; // "use strict"; 如果是严格模式，这里就会报错
 
// 测试新属性，是 undefined，表明未添加成功
console.log(obj.age);
```


## Object.seal
让一个对象密封，并返回被密封后的对象。
- 密封对象是指那些不能添加新的属性
- 不能删除已有属性，
- 不能修改已有属性的可枚举性、可配置性、可写性
- 但可以修改已有属性的值的对象。
- Object.isSealed 来检测

```js
var obj = {name: 'John'}
 
// 密封
Object.seal(obj)
 
// 不能添加新属性
obj.age = 30
console.log(obj.age) // undefined
```

## Object.freeze
这个方法比 Object.seal 更绝，冻结对象是指那些
- 不能添加新的属性，
- 不能修改已有属性的值，
- 不能删除已有属性，
- 以及不能修改已有属性的可枚举性、可配置性、可写性的对象。
- 也就是说，这个对象永远是不可变的。
- Object.isFrozen

```js
var obj = {name: 'John'}
Object.freeze(obj)
obj.age = 30
console.log(obj.age) // undefined
```