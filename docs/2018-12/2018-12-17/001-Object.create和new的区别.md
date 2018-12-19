# Object.create和new的区别
- https://blog.csdn.net/little_little0_0/article/details/80635143

## 相关的概念：
> 再说区别之前我们先要明确一些相关的概念：
1. 对象有属性 `__proto__`，指向该对象的构造函数的原型对象
2. 方法除了有属性 `__proto__` ，还有属性 `prototype` , `prototype` 指向该方法的原型对象
