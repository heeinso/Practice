# 배열 \(Array\)

* 자바스크립트는 배열 같은 특성을 지닌 객체를 제공한다

## 배열 리터럴

```javascript
var empty = [];
var numbers = [
  'zero', 'one', 'two', 'three', 'four',
  'five', 'six', 'seven', 'eight', 'nine'
];
empty[1] // undefined
numbers[1] //'one'

empty.length // 0
numbers.length // 10
```

* 다음은 유사한 결과를 보이는 객체 리터럴

```javascript
var numbers_object = {
  '0': 'zero', '1': 'one', '2': 'two',
  '3': 'three', '4': 'four', '5': 'five',
  '6': 'six', '7': 'seven', '8': 'eight',
  '9': 'nine'
};
```

> numbers와 number\_object의 근본적인 차이점은 numbers는 Array.prototype을 상속했고 number\_object는 Object.prototype을 상속했다는 점이다

## length 속성

* 모든 배열은 length 속성이 존재
* 여타 다른 언어들과 달리 자바스크립트에서 배열의 길이는 upper bound 기반이 아니라서 만약 현재 length보다 더 큰 첨자로 항목을 추가하면 length는 새로운 항목을 추가할 수 있게 늘어남

```javascript
var myArray = [];
myArray.length // 0

myArray[1000000] = true;
myArray.length // 1000001

numbers.length = 3;
// numbers = ['zero', 'one', 'two']

numbers[numbers.length] = 'shi';
// numbers = ['zero', 'one', 'two', 'shi']

numbers.push('go');
// numbers = ['zero', 'one', 'two', 'shi', 'go']
```

## 삭제

* delete 연산자

```javascript
delete numbers[2];
// numbers = ['zero', 'one', undefined, 'shi', 'go']
```

* splice 연산자 

```javascript
numbers.splice(2, 1);
// numbers = ['zero', 'one', 'shi', 'go']
```

## 열거

* 자바스크립트의 배열은 실제 객체이기 때문에 for in 문으로 배열의 모든 속성을 열거할 수 있다
* 하지만 for in 문이 배열을 열거하는데 그다지 적합한 편은 아니다
  * 대부분의 배열을 열거하는 작업에서는 배열의 첨자 순으로 열거되는 것을 당연하게 생각하는데 반해 for in 문은 속성들의 순서를 보장하지 않는다
  * 또한 for in 문을 사용하면 프로토타입 체인에 있는 예상치 못한 속성도 열거될 수 있다

```javascript
var i;
for (i=0; i<myArray.length; i++) {
  document.writeln(myArray[i]);
}
```

