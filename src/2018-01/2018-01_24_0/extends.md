# 比较好的方案总结：
+ prototype继承
+ copy 继承
+ Object.create

## resouces:
+ https://www.cnblogs.com/humin/p/4556820.html

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

## 总结：
+ prototype继承，性能最好，因为利用了js的prototype查找特性，只有一份copy
+ copy 继承，可以实现 mixin 多继承的特性，但每个实例上保存一个方法，或者属性的指针，这份copy 不大，但肯定还是有空间的开销; 利用了空间换时间，理论上，内存够用的情况，这个也不差
+ Object.create 是es5引入的，实际比new的性能还要差，但如果支持es5/6的环境，可能直接考虑用babel了，不需要采纳此方案