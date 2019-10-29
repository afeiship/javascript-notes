// 变量提升以及var对变量提升的

var a = "I'm a in all";

function test1() {
  console.log(a); 
  console.log(window.a);

  var a = "I'm a in test1";
  console.log(a);
}

test1();


// 在 fn test {} 的范围内，有一个局部变量 a （因为 var a 的原因）
// 全局变量 window.a
// 由于变量没有赋值之前，默认值为  undefined

// undefind
// I'm a in all
// I'm a in test1