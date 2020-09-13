# 배열의 특성들

* 자바스크립트 프로그램에서 흔한 오류 중 하나는 배열이 필요할 때 객체를 사용한다거나 객체가 필요할 때 배열을 사용하는 경우이다
* 따라서 속성 이름이 작은 크기의 연속된 정수이면 배열을 사용하고 그렇지 않으면 객체를 사용하는 것이 좋다
* 사실 자바스크립트에는 배열과 객체를 구분하는 마땅한 메커니즘이 없으므로 이러한 결점을 보완하기 위해 다음과 같은 함수를 만들어 사용할 수 있다

```javascript
var is_array = function(value) {
  return value && 
  typeof value === 'object' &&
  value.constructor === Array;
};
```

> 이 함수는 한가지 문제가 있는데 다른 창\(window\)이나 프레임에서 생성한 배열은 구분하지 못한다는 점이다

```javascript
var is_array = function(value) {
  return value &&
  typeof value === 'object' &&
  typeof value.length === 'number' &&
  typeof value.splice === 'function' &&
  !(value.propertyIsEnumerable('length'));
};
```

## 배열의 메소드

* 자바스크립트는 배열에 동작하는 메소드들을 제공하는 이 메소드들은 Array.prototype에 저장돼 있는 함수들이다

```javascript
Array.method('reduce', function(f, value) {
  var i;
  for (i=0; i<this.length; i++) {
    value = f(this[i], value);
  }
  return value;
});
```

> 이제 배열의 각 요소들은 reduce에 넘겨진 함수에 value와 같이 넘겨지고 계산된 값이 다시 value에 저장된다. 따라서 두 수를 더하는 함수를 넘겼다면 호출의 결과는 배열 요소들 전체의 합이 되고, 두 수를 곱하는 함수를 넘겼다면 전체의 곱이 된다

```javascript
// 숫자들이 요소인 배열 생성
var data = [4, 8, 15, 16, 23, 42];

// 간단한 함수 두 개를 정의
// 하나는 두 수를 더하는 함수이고 다른 하나는
// 두 수를 곱하는 함수
var add =function(a, b) {
  return a + b;
}

var mult = function(a, b) {
  return a * b;
}

// add 함수를 넘기면서 data의 reduce 메소드 호출
var sum = data.reduce(add, 0); // 108

// mult 함수를 넘기면서 reduce 메소드 다시 호출
var product = data.reduce(mult, 1); // 7418880
```

## 배열의 크기와 차원

* 자바스크립트의 배열은 보통 초기화되지 않아서 만약 새로운 배열을 \[\]로 만들게 되면 배열은 비어있게 된다

```javascript
Array.dim = function(dimension, initial) {
  var a = [], i;
  for (i=0; i<dimension; i++) {
    a[i] = initial;
  }
  return a;
};

// 10개의 0을 갖는 배열 생성
var myArray = Array.dim(10, 0);
```

* 자바스크립트에는 다차원 배열이 없지만 대부분 C 유형의 언어처럼 다음과 같이 배열의 배열을 사용할 수 있다

```javascript
var matrix = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8]
];

matrix[2][1] // 7
```

* 2차원 배열을 만들기 위한 방법은 다음과 같다

```javascript
Array.matrix = function(m, n, initial) {
  var a, i, j, mat = [];
  for (i=0; i<m; i++) {
    a = [];
    for (j=0; j<n; j++) {
      a[j] = initial;
    }
    mat[i] = a;
  }
  return mat;
};

// 0으로 채워진 4 * 4 행렬 생성
var myMatrix = Array.matrix(4, 4, 0);
document.writeln(myMatrix[3][3]); // 0

// 행과 열이 같은 수의 행렬을 만드는 메소드 
Array.identity = function(n) {
  var i, mat = Array.matrix(n, n, 0);
  for (i=0; i<n; i++) {
    mat[i][i] = 1;
  }
  return mat;
};

myMatrix = Array.identity(4);
document.writeln(myMatrix[3][3]); // 1
```

