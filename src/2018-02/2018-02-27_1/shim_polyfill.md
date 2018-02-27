# shim-polyfill

## resource:
+ http://www.haomou.net/2016/10/22/2016_polyfill_shim/

## 添加 polyfill 的时候应该注意：
1. 在IE下面有个bug，就是在使用 for in 这种循环的时候，ie下会遍历输出原型链上的方法
2. 所以，应该用 Object.definePropery 的思路来定义方法：


```js
Array.proptotye.find = function(){
    // polyfill codes...
};
var a = [1,2];
for(var i in a){
    console.log(i);
}
//output
// 1
// 2
// find
```