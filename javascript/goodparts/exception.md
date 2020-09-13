# 예외 \(Exception\)

* 자바스크립트는 예외를 다룰 수 있는 메커니즘을 제공한다
* 예외는 정상적인 프로그램의 흐름을 방해하는 비정상적인 사고로 이것이 발생하면 프로그램은 예외를 발생시킨다

```javascript
var add =function(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw {
      name: 'TypeError',
      message: 'add needs numbers'
    };
  }
  return a+b;
}
```

* throw문은 함수의 실행을 중단한다. thorw문은 어떤 예외인지 알 수 있게 해주는 name 속성과 예외에 대해 설명하는 message 속성을 가진 예외 객체를 반환해야 한다
* 예외 객체는 try문의 catch절에 전달된다

```javascript
// 새로운 add 함수를 잘못된 방법으로 호출하는
// try_it 함수 작성
var try_it = function() {
  try {
    add("seven");
  } catch(e) {
    document.writeln(e.name + ': ' + e.message);
  }
}
try_it();
```

