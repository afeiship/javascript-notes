var obj = {
  name: "Tom",
  sayName: function() {
    console.log(this, this.name);
  }
};

var name = obj.sayName;

// 这里就会报错，string()肯定会报错。
name();


// obj.sayName();

/*
- 其实就是 name 是一个属性。
- 而这个属性的 set 逻辑实际上就是 toString。
- chrome; https://tva1.sinaimg.cn/large/006y8mN6gy1g8eamen3s2j30ic0jmmy2.jpg
- safari: https://tva1.sinaimg.cn/large/006y8mN6gy1g8eaqmxcmkj30na0a0wf8.jpg
- firefox: https://tva1.sinaimg.cn/large/006y8mN6gy1g8earx9rcqj30lu0fy3zt.jpg

所以，总结，name 是个特殊的特性
set/get 都被 windows 改写过。
*/

