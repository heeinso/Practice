function createPerson(name, age, job) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function() {
        console.log(this.name);
    };
    return o;
}

var person1 = createPerson("Steve", 26, "Graduate student");
var person2 = createPerson("heeinso", 28, "Web developer");

/* The factory pattern solves the problem of code duplication when creating multiple similar objects, but it does not solve the problem of not knowing what type of object you are creating. Therefore, we use the following constructor pattern. */

function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function() {
        console.log(this.name);
    };
}

var person1 = createPerson("Steve", 26, "Graduate student");
var person2 = createPerson("heeinso", 28, "Web developer");


/* Characteristics of the constructor pattern when compared to the factory pattern

- Do not create objects explicitly.
- Properties and methods are assigned directly to this object.
- There is no return statement. */



