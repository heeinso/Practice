var age = 29;
function sayAge() {
    console.log(this.age);
}

console.log(window.age); // 29
sayAge(); // 29
window.sayAge(); // 29