function SuperType() {
    this.color = ['red', 'blue', 'green'];
}

function SubType() {
    SuperType.call(this);
}

var instance1 = new SubType();
instance1.colors.push('black');

console.log(instance1.colors); // "red, blue, green, black"

var instance2 = new SubType();
console.log(instance2.colors); // "red, blue, green"