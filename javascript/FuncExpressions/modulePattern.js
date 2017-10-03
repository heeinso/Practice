/* 모듈 패턴은 싱글톤과 같은 일을 한다. 참고로 싱글톤이란 인스턴스를 단 하나만 갖게 의도한 객체이다.
전통적으로 자바스크립트에서 싱글톤을 만들 때는 아래와 같이 객체 리터럴 표기법을 썼다.
*/

var singleton = {
    name: value,
    method: function() {

    }
}

var singleton = function() {
    var privateVariable = 10;

    function privateFunc() {
        return false;
    }

    return {
        publicProperty: true,

        publicMethod: function() {
            privateVariable++;
            return privateFunc();
        }
    };
}();


