## 의사 클래스 방식 (Pseudoclassical)

* 자바스크립트는 프로토타입적 본성에 맞게 객체에서 다른 객체로 직접 상속하는 방법을 갖는 대신에 생성자 함수를 통해 객체를 생성하는 것과 같은 불필요한 간접적인 단계가 있다

* 함수 객체가 만들어질 때, 함수를 생성하는 Function 생성자는 다음과 같은 코드를 실행한다

```javascript
this.prototype = {constructor: this};
``` 

* 새로운 함수 객체는, 새로운 함수 객체를 값으로 갖는 constructor라는 속성이 있는 객체를 prototype 속성에 할당받는다


* new 연산자를 사용하여 생성자 호출 패턴으로 함수가 호출되면 함수가 실행되는 방법이 변경된다. 만약 new 연산자가 메소드였다면 아마 다음과 같이 구현됐을 것이다.

```javascript
Function.method('new', function() {
  // 생성자의 프로토타입을 상속받는 새로운 객체 생성
  var that = Object.create(this.prototype);
  
  // this를 새로운 객체에 바인딩하면서 생성자 호출
  var other = this.apply(that, arguments);
  
  // 반환값이 객체가 아니면, 새로운 객체로 대체
  return (typeof other === 'object' && other) || that;
});
```
