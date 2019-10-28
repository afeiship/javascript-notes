// https://www.jianshu.com/p/fa09cd88cd6d

// 执行a==1时，js引擎会尝试把对象类型a转化为数字类型，首先调用a的valueOf方法来判断，不行则继续调用toString方法，然后再把toString返回的字符串转化为数字类型再去和a作比较(这里我重写了toString就直接返回的数字类型的结果，正常情况toString返回的字符串)。
// 所以每一次使用==判断都会调用一次a的toString方法，返回i属性的值，然后使a的i属性加1，这样最后的判断结果自然就为true了。
// 其实重写valueOf方法也可以实现，而且转化时会优先调用valueOf方法:

// (a== 1 && a ==2 && a==3)可能为true吗?

let a = {
  i: 1,
  toString() {
    return a.i++;
  }
};

if (a == 1 && a == 2 && a == 3) {
  console.log("Hello World!");
}
// 这里改写  valueOf 方法也是可以的
// 输出Hello World!
