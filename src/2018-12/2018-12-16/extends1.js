function Human(name) {
    this.name = name;
}

Human.prototype.say = function () {
    console.log('hi');
};

function Person(name, sex) {
    Human.call(this, name);
    this.sex = sex;
}

// 保持 Person.prototype 是mutable的
Person.prototype = Object.create(Human.prototype);

// 下面这种方式实现的继承就会有，动态添加方法，属性并不能添加上去
//Person.prototype = Object.assign(Person.prototype, Human.prototype)

p1 = new Person();
p1.say()


Human.prototype.hello = function () {
    console.log('hello')
}

p1.hello();
