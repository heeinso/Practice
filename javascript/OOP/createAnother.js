function createAnother(original) {
    var clone = object(original);
    clone.sayHi = function() {
        console.log("hi");
    };
    return clone;
}

var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};

var anotherPerson = createAnother(person);
anotherPerson.sayHi(); // "hi"

function inheritPrototype(subType, superType) {
    var prototype = object(superType.prototype); // 객체 생성
    prototype.constructor = subType; // 객체 확장
    subType.prototype = prototype; // 객체 할당
}

function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

SuperType.prototype.sayName = function() {
    console.log(this.name);
};

function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = funtcion() {
    console.log(this.age);
}