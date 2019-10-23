# Math.random()随机数的二三事
- https://soulteary.com/2014/07/05/js-math-random-trick.html

## Math.random 随机
```js
// 结论： 11 - 24 ，可能还不只这个长度，很无聊的试验
function getRandomRange(inLen){
    var result = [];
    var len = inLen ||  100;
    for(var i=0; i< len; i++){
        result.push( Math.random().toString().length )
    }
    return {
        min: Math.min.apply(null, result),
        max: Math.max.apply(null, result),
    }
}
```

## 三个有意思的函数：
+ https://baike.baidu.com/item/ceil/10931457?fr=aladdin
- Math.round: 四舍五入
- Math.ceil: 永远进位
- Math.floor: 永远取整
> 对于浮点数，round会遵守四舍五入规则，ceil无论如何贪心进位+1，floor无论如何都小心翼翼的自断一臂-1，至于整数，自己试试看咯。
~~~
函数名： ceil
用 法： double ceil(double x);
功 能： 返回大于或者等于指定表达式的最小整数
~~~

```js
// ==== 四舍五入之---- 四舍
> Math.round(8.26644050120376)
8
 
> Math.ceil(8.26644050120376)
9
 
> Math.floor(8.26644050120376)
8

// ==== 四舍五入之---- 五入
> Math.round(8.56644050120376)
9
 
> Math.ceil(8.56644050120376)
9
 
> Math.floor(8.56644050120376)
8
```