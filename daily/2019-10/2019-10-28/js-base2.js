// 'use strict';

var name = 'a';
function outter(){
  var name = "b";
  function inner(){
    console.log(name);
    console.log(this.name);
  }

  inner();
}

outter();


// // 'use strict';
// 在这个模式下会报错
