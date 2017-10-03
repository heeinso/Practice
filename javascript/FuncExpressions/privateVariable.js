function myObject() {
    var privateVariable = 10;

    function privateFunc() {
        return false;
    }

    this.publicMethod = function() {
        privateVariable++;
        return privateFunc();
    };
}


function Person(name) {
    this.getName = function() {
        return name;
    };

    this.setName = function() {
        name = value;
    };
}

var person = new Person("Nicholas");
console.log(person.getName());
person.setName("Greg");
console.log(person.getName());