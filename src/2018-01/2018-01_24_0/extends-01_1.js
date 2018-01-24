var slice = Array.prototype.slice;

function Animal( inName, inColor ){
    this.name = inName;
    this.color = inColor;
}

Animal.prototype.say = function(){
    console.log(`I am ${this.name}, my color is:${this.color}`);
};

function Cat(){
    // notes1: 保证构造函数正常继承
    Animal.apply( this, slice.call( arguments ) );
}

// 保证原型链能正常继承父类的方法：
Cat.prototype = new Animal();

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