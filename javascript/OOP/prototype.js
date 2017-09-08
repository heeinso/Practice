function Person() {
    Person.prototype.name = "Steve";
    Person.prototype.age = 26;
    Person.prototype.job = "Graduate student";
    Person.prototype.sayName = function() {
        console.log(this.name);
    };

    var person1 = new Person();
    person1.sayName();

    var person2 = new Person();
    person2.sayName();

    console.log(person1.sayName == person2.sayName); // true
}


console.log(Person.prototype.isPrototypeOf(person1)); // true
console.log(Person.prototype.isPrototypeOf(person2)); // true


function Person2() {
    Person2.prototype.name = "Nicholas";
    Person2.prototype.age = 29;
    Person2.prototype.job = "Software Engineer";
    Person2.prototype.sayName = function() {
        console.log(this.name);
    };
};

var keys = Object.keys(Person2.prototype);
console.log(keys);

var p1 = new Person2();
p1.name = "Rob";
p1.age = 31;
var p1keys = Object.keys(p1);
console.log(p1keys);
