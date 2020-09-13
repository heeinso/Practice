# 열거 \(Enumeration\)

* for in 구문을 사용해 객체에 있는 모든 속성의 이름을 열거할 수 있다.
  * 이러한 열거 방법에는 함수나 프로토타입에 있는 속성 등 모든 속성이 포함되기 때문에 필터링 필요
  * 일반적으로 hasOwnProperty 메소드와 함수를 배제하기 위한 typeof 사용

```javascript
var name;
for (name in another_stooge) {
  if (typeof another_stooge[name] !== 'function') {
    document.writeln(name + ': ' + another_stooge[name]);
  }
}
```

* for in 구문을 사용하면 속성들이 이름순으로 나온다는 보장이 없음
  * 만약 특정 순으로 속성 이름들이 열거되기를 원한다면 다음 예처럼 속성이 열거되기 원하는 순서를 특정 배열로 지정하고 이 배열을 이용해 객체의 속성 열거 가능

```javascript
var i;
var properties = [
  'first-name',
  'middle-name',
  'last-name',
  'profession'
];
for (i=0; i<properties.length; i++) {
  document.writeln(properties[i] + ': ' + another_stooge[properties[i]]);
}
```

