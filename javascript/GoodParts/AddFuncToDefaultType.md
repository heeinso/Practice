## 기본 타입에 기능 추가

* 자바스크립트는 언어의 기본 타입에 기능을 추가하는 것을 허용한다
* Object.prototype에 메소드를 추가해 모든 객체에서 이 메소드를 사용 가능하게 만든다
* 이러한 작업은 함수, 배열 문자열, 숫자, 정규표현식, 불리언에 모두 유효


* 자바스크립트에는 따로 구분된 정수형이 없어서 때때로 숫자형에서 정수 부분만 추출해야 하는 경우가 생긴다
* 이러한 작업을 위해 자바스크립트가 제공하는 방법은 용이하지 않다
* 다음의 예처럼 Number.prototype에 integer라는 메소드를 추가해서 해결 가능

```javascript
Number.method('integer', function() {
  return Math[this < 0 ? 'ceiling' : 'floor'](this);
});
document.writeln((-10/3).integer()); // -3
```

* 또한 자바스크립트에는 문자열의 양 끝에 있는 빈 칸을 지우는 메소드가 없는데 아래와 같이 해결 가능

```javascript
String.method('trim', function() {
  return this.replace(/^\s+|\s+$/g, '');
});
document.writeln('"' + "  neat  ".trim() + '"');
```

* 위와 같은 방법으로 기본 타입에 기능을 추가함으로써 언어의 능력을 배가시킬 수 있다
* 프로토타입에 의한 상속이라는 동적인 특성 덕분에 새로운 메소드를 추가하면 관련된 값들에는 바로 새로운 메소드들이 추가된다
* 이러한 특성은 해당 값이 새로운 메소드가 추가되기 전에 생성됐더라도 관계 없이 적용된다

