# call faster than apply
> 【 js 基础 】为什么 call 比 apply 快？

## 我的理解
1. call 会比 apply 快
2. 因为 apply 最终执行会被转化为 call
3. apply 的执行：`CreateListFromArrayLike` 会将 `array` 转为化 `ArgumentsList` 这种数据交给内部函数执行
4. 而 call 用户传入的会直接就是 `ArgumentsList` 减少了很多转化的步骤，所以会比较快


```js
// （ 代码来自 backbone ）
var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
    }
};
```

```js
Function.prototype.apply2 = function( self, arguments ){
    switch( arguments.length ){
         case 1:  
            this.call( self, arguments[0] ); 
            break;
         case 2:  
            this.call( self, arguments[0], arguments[1] );
            break;
         case 3:  
            this.call( self, arguments[0], arguments[1], arguments[2] );
            break;
         case 4:  
            this.call( self, arguments[0], arguments[1], arguments[2], arguments[3] );
            break;
         case 5:  
            this.call( self, arguments[0], arguments[1], arguments[2], arguments[3], arguments[4] );
            break;
         case 6:  
            this.call( self, arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5] );
            break;
         default: this.apply( self, arguments ); break;
    }   
};
```

~~~
作者会在参数为3个（包含3）以内时，优先使用 call 方法进行事件的处理。而当参数过多（多余3个）时，才考虑使用 apply 方法。
这个的原因就是 call 比 apply 快。 
~~~

## 原因
> FEI: 原因，apply 底层是调用 call 的
Function.prototype.apply (thisArg, argArray)

1、如果IsCallable（Function）为false，即Function不可以被调用，则抛出一个TypeError异常。
2、如果argArray为null或未定义，则返回调用function的[[Call]]内部方法的结果，提供thisArg和一个空数组作为参数。
3、如果 Type（argArray）不是Object，则抛出TypeError异常。
4、获取argArray的长度。调用argArray的[[Get]]内部方法，找到属性length。 赋值给len。
5、定义 n 为ToUint32（len）。ToUint32（len）方法：将其参数len转换为范围为0到2^32-1的2^32个整数值中的一个。
6、初始化 argList 为一个空列表。
7、初始化 index 为 0。
8、循环迭代取出argArray。重复循环 while（index < n）
    a、将下标转换成String类型。初始化 indexName 为 ToString(index).
    b、定义 nextArg 为 使用 indexName 作为参数调用argArray的[[Get]]内部方法的结果。
    c、将 nextArg 添加到 argList 中，作为最后一个元素。
    d、设置 index ＝ index＋1
9、返回调用func的[[Call]]内部方法的结果，提供thisArg作为该值，argList作为参数列表

## resources
- https://tc39.es/ecma262/#sec-function.prototype.apply
- https://www.zhihu.com/question/61088667
- https://github.com/noneven/__/issues/6
- https://blog.csdn.net/zhengyinhui100/article/details/7837127/
- https://stackoverflow.com/questions/23769556/why-is-call-so-much-faster-than-apply