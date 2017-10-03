(function() {
    var privateVariable = 10;

    function privateFunc() {
        return false;
    };

    MyObject = function() {
    };

    MyObject.prototype.publicMethod = function() {
        privateVariable++;
        return privateFunc();
    };
})();


/* 아래와 같은 방식으로 정적 고유 변수를 생성하면 각 인스턴스가 독립 변수를 가질 수는 없지만,
프로토타입을 통해 코드 재사용성은 좋아진다. 인스턴스를 쓸 것인지 정적 고유 변수를 쓸 것인지는
상황에 따라 결정해야 한다.
*/

(function() {
    var name = "";

    Person = function(value) {
        name = value;
    };

    Person.prototype.getName = function() {
        return name;
    };

    Person.prototype.setName = function() {
        name = value;
    };
})();

var person1 = new Person("Nicholas");
console.log(person1.getName());
person1.setName("Greg");
console.log(person1.getName());

var person2 = new Person("Michael");
console.log(person1.getName());
console.log(person2.getName());

