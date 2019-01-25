# string numeric compare:
> 两个数是不确定大小的，可能超过了 Number 的最大值，所以，需要用字符串来表示, 比较他们的大小



```js
// 两个数是不确定大小的，可能超过了 Number 的最大值，所以，需要用字符串来表示
var num1 = '1233';
var num2 = '2444';

// 转化为逻辑语言：
// compare: https://github.com/afeiship/next-numeric
// 1. 如果位数相同，则取每个位数的和，这个值大的，即为较大的值
// 2. 如果位数不同，则位数大的为较大的值
```
