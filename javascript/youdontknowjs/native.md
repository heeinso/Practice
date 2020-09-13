# Native

배열, 객체, 함수, 정규식 값은 리터럴 형태로 생성하는 것이 일반적이지만 리터럴은 생성자 형식으로 만든 것과 동일한 종류의 객체를 생성한다

## Array

```javascript
var a = new Array(3);
a; // [<3 empty slots>]

var b = [undefined, undefined, undefined];
b; // [undefined, undefined, undefined]

a.map(function(v, i) {return i;}); // [<3 empty slots>]
b.map(function(v, i) {return i;}); // [0, 1, 2]
```

> a에 슬롯이 없기 때문에 map\(\) 함수가 순회할 원소가 없다.

\('빈 슬롯' 말고\) 진짜 undefined 값 원소로 채워진 배열은 \(손으로 입력하지 않고\) 어떻게 생성할까?

```javascript
var a = Array.apply(null, {length: 3});
a; // [undefined, undefined, undefined]
```

apply\(\)는 모든 함수에서 사용 가능한 유틸리티로, 특이한 방법으로 함수를 호출한다

* 첫번째 인자 this는 객체 바인딩
* 두번째 인자는 인자의 배열로서 이 안에 포함된 원소들이 펼쳐져 함수의 인자로 전달됨

## Date\(\) and Error\(\)

네이티브 생성자 Date\(\)와 Error\(\)는 리터럴 형식이 없으므로 다른 네이티브에 비해 유용하다

date 객체 값은 new Date\(\)로 생성한다. 이 생성자는 날짜/시각을 인자로 받는다

```javascript
if (!Date.now) {
    Date.now = function() {
        return (new Date()).getTime();
    };
}
```

> new 키워드 없이 Date\(\)를 호출하면 현재 날짜/시각에 해당하는 문자열을 반환

Error\(\) 생성자는 앞에 new가 있든 없든 결과는 같다

error 객체의 주 용도는 현재의 실행 스택 콘텍스트를 포착하여 객체에 담는

## 네이티브 프로토타입

내장 네이티브 생성자는 각자의 .prototype 객체를 가진다

* prototype 객체에는 해당 객체의 하위 타입별로 고유한 로직이 담겨 있다

예컨대, 문자열 원시값을 박싱하여 확장한 것까지 포함해 모든 String 객체는 String.prototyp 객체에 정의된 메서드에 접근 가능

* String.prototype.indexOf\(\): 문자열에서 특정 문자의 위치 검색
* String.prototype.charAt\(\): 문자열에서 특정 위치의 문자 반환
* String.prototype.substr\(\) / String.prototype.substring\(\) / String.prototype.slice\(\): 문자열의 일부를 새로운 문자열로 추출
* String.prototype.toUpperCase\(\) / String.prototype.toLowerCase\(\): 대문자/소문자로 변환된 새로운 문자열 생성
* String.prototype.trim\(\): 앞/뒤의 공란이 제거된 새로운 문자열 생성  

이 중 문자열 값을 변경하는 메서드는 없고 수정이 일어나면 항상 기존 값으로부터 새로운 값을 생성함

