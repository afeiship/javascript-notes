var a = "I'm a in all";

{
  console.log(a); 
  console.log(window.a);

  var a = "I'm a in test1";
  console.log(a);
}

// I'm a in all
// I'm a in all
// I'm a in test1

// 可以看出， 这种 {} 并没有这个作用
// 因为 js 里针对 var，并没有这种块级作用域