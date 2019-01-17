# __proto__
> 每个对象的__proto__属性指向自身构造函数的prototype

## 以下三点需要谨记
1. 每个对象都具有一个名为__proto__的属性；
2. 每个构造函数（构造函数标准为大写开头，如Function()，Object()等等JS中自带的构造函数，以及自己创建的）都具有一个名为prototype的方法（注意：既然是方法，那么就是一个对象（JS中函数同样是对象），所以prototype同样带有__proto__属性）；
3. 每个对象的__proto__属性指向自身构造函数的prototype；