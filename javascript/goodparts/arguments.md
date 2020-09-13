# 인수 배열\(arguments\)

* 함수를 호출할 때 추가적인 매개변수로 arguments라는 배열을 사용할 수 있다
* 이 arguments라는 매개변수는 매개변수의 개수를 정확히 정해놓지 않고, 넘어오는 인수의 개수에 맞춰서 동작하는 함수를 만들 수 있게 한다

```javascript
// 여러 작업을 수행하는 함수를 만든다
// 함수 내부에 있는 sum이라는 변수는
// 외부에 있는 sum 변수에 영향을 미치지 않는다
// 함수는 오로지 내부의 sum에만 영향을 미친다
var sum = function() {
  var i, sum = 0;
  for (i = 0; i < arguments.length; i += 1) {
    sum += arguments[i];
  }
  return sum;
};
document.writeln(4, 8, 15, 16, 23, 42);
```

* 설계상의 문제로 arguments는 실제 배열은 아니다. 다만 배열 같은 객체일 뿐
* arguments는 length라는 속성이 있지만 다른 모든 배열들이 가지는 메소드들은 없다

