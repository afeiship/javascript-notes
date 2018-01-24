/**
 *  这里用next里的Object.assign 方案来：
 */

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
    Animal.apply( this, slice.call(arguments) );
}

// Mix 方案：
Object.assign(
    Cat.prototype,
    Animal.prototype,
    {
        constructor: Cat
    }
);


// 实例化，顺理成章：
var cat = new Cat('Tom','black');
cat.say();

console.log(
    cat instanceof Cat,
    cat instanceof Animal,
    Cat.prototype.constructor
);