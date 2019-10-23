// arrow : arrow function 会锁定作用域，所以，这个是和具体的实例相关的。一定有类似 fn.bind(this) 之类的代码
// normal: 里面的 this 是与当前 function；