## 프로토타입 (Prototype)

* 모든 객체는 속성을 상속하는 프로토타입 객체에 연결
   
* 객체 리터럴로 생성되는 모든 객체는 자바스크립트의 표준 객체인 Object의 속성인 prototype 객체에 연결

```javascript
if (typeof Object.create !== 'function') {
  Object.create = function (o) {
    var F = function() {};
    F.prototype = o;
    return new F();
  };
}
var another_stooge = Object.create(stooge);
```