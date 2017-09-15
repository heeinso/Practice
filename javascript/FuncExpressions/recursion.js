function factorial(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * arguments.callee(num-1);
    }
}
/* strict mode

var factorial = (function f(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * f(num-1);
    }
});
*/

