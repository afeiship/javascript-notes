# 比较好的方案总结：
+ prototype继承
+ copy 继承
+ Object.create

## 注意的问题：
```js
// 修复 Cat.prototype.constructor
Cat.prototype.constructor = Cat;
```

## prototype继承
```js
// 父：Animal 子：Cat

// 创建一个没有实例方法的类
var Super = function(){};
Super.prototype = Animal.prototype;
//将实例作为子类的原型
Cat.prototype = new Super();

Cat.prototype.constructor = Cat;
```

## copy 继承
> next里的方案，大概原理就是：
```js
Cat.prototype = nx.mix({
    constructor: Cat,
}, Cat.prototype, Animal.prototype );
```

## Object.create
```js
child.prototype = Object.create( Animal.prototype );

Cat.prototype.constructor = Cat;
```