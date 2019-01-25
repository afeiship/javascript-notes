# string + plus:
> 趣味题：当两个字符串表示的数据相加；因为有可能超过 Number 的最大值，所以，考虑直接用 string 的方式来计算

## 另一种思路：
- https://blog.csdn.net/yytIcon/article/details/78893943

```js
// 1325 + 9839
var arr1 = [ 5,2,3,1 ]
var arr2 = [ 9,3,8,9 ]
var carry = 0;

var max = Math.max(arr1.length, arr2.length);
var result = [];

for (var i = 0; i < max; i++) {
  var item1 = arr1[i] || 0;
  var item2 = arr2[i] || 0;
  var total = item1 + item2 + carry;
  var item = total % 10;
  carry = parseInt(total / 10);
  result.push(item);
}

result.push(carry);

console.log(
    result.reverse().join('')
);
```