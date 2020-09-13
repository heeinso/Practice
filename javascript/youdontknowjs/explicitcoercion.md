# 명시적 강제변환

자바스크립트의 명시적 강제변환은 정적 타입 언어에서 지극히 당연하다고 여겨지는 타입변환의 관례를 충실히 따르고 있기에 별다른 논쟁거리는 없다

## 문자열과 숫자

문자열 &lt;=&gt; 숫자 강제변환은 String\(\)과 Number\(\) 함수를 이용하는데 앞에 new 키워드가 붙지 않기 때문에 객체 래퍼를 생성하는 것이 아니다

```javascript
var a = 42;
var b = String(a);

var c = "3.14";
var d = Number(c);

b; // "42"
d; // 3.14
```

## 날짜와 숫자

```javascript
var d = new Date("Wed, 22 Dec 2017 21:50:17 CDT");
+d // 1513997417000
```

> 날짜 타입에 관한 한 강제변환은 권하고 싶지 않다. 현재 타임스탬프는 Date.now\(\)로, 그 외 특정 날짜/시간의 타임스탬프는 new Date\(\).getTime\(\)를 대신 쓰도록 하자

## 숫자 형태의 문자열 파싱

문자열에 포함된 숫자를 파싱하는 것은 '문자열-숫자' 강제변환과 결과는 비슷하지만 타입변환과는 분명한 차이 존재

```javascript
var a = "42";
var b = "42px";

Number(a); // 42
parseInt(a); // 42

Number(b); // NaN
parseInt(b); // 42
```

> 파싱은 Non-Numeric Character를 허용한다. 즉, 좌-우 방향으로 파싱하다가 숫자같지 않은 문자를 만나면 즉시 멈춘다. 반면, 강제변환은 Non-Numeric을 허용하지 않기때문에 NaN을 내고 두 손 들어버린다

## Non-Boolean과 Boolean

```javascript
var a = "0";
var b = [];
var c = {};

var d = "";
var e = 0;
var f = null;
var g;

Boolean(a); // true
Boolean(b); // true
Boolean(c); // true

Boolean(d); // false
Boolean(e); // false
Boolean(f); // false
Boolean(g); // false
```

