/**
 * 
 https://www.cnblogs.com/humin/p/4556820.html
寄生组合继承
核心：通过寄生方式，砍掉父类的实例属性，这样，在调用两次父类的构造的时候，就不会初始化两次实例方法/属性，避免的组合继承的缺点
 */
function Animal( inName, inColor ){
    this.name = inName;
    this.color = inColor;
}

Animal.prototype.say = function(){
    console.log(`I am ${this.name}, my color is:${this.color}`);
};


function Cat(inName, inColor) {
    Animal.call(this, inName, inColor);
}

// 创建一个没有实例方法的类
var Super = function(){};
Super.prototype = Animal.prototype;
//将实例作为子类的原型
Cat.prototype = new Super();

// 修复 Cat.prototype.constructor
Cat.prototype.constructor = Cat;



// 实例化，顺理成章：
var cat = new Cat('Tom','black');
cat.say();

console.log(
    cat instanceof Cat,
    cat instanceof Animal,
    Cat.prototype.constructor
);