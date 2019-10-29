let a = "I'm a in all";

{
  console.log(a); 
  console.log(window.a);

  a = "I'm a in test1";
  console.log(a);
}


// I'm a in all
// undefined
// I'm a in test1