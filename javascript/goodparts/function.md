# Function

## 함수 객체

* 객체 중에서 객체 리터럴로 생성되는 객체는 Object.prototype에 연결되지만 함수 객체는 Function.prototype에 연결된다
  * Function은 Object.prototype에 연결된다
  * 모든 함수는 숨겨져 있는 두 가지 속성 - context, code - 을 갖는다
* 모든 함수 객체는 prototype이라는 속성이 있다
  * 이 속성의 값은 함수 자체를 값으로 갖는 contructor라는 속성이 있는 객체다
  * 함수는 객체이기 때문에 다른 값들처럼 사용할 수 있다
  * 함수는 변수나 객체, 배열 등에 저장되며, 다른 함수에 전달하는 인수로도 사용하고 함수의 반환값으로도 사용한다

## 함수 리터럴

```javascript
// add라는 변수를 생성하고 두 수를 더하는 함수를
// 이 변수에 저장
var add = function(a, b) {
  return a + b;
}
```

