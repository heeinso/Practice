## 호출

* 함수를 호출하면 현재 함수의 실행을 잠시 중단하고 제어를 매개변수와 함께 호출한 함수로 넘긴다
* 모든 함수는 명시되어 있는 매개변수에 더해서 this와 arguments라는 추가적인 매개변수 두 개를 받게된다
    * this라는 매개변수는 개체지향 프로그래밍 관점에서 매우 중요하며, 이 매개변수의 값은 호출하는 패턴에 의해 결정된다
    
    
### 메소드 호출 패턴

* 함수를 객체의 속성에 저장하는 경우 이 함수를 메소드라고 부른다
* 메소를 호출할 때, this는 메소드를 포함하고 있는 객체에 바인딩된다 (즉, this는 객체 자체가 됨)

```javascript
// value와 increment 메소드가 있는 myObject 생성
// increment 메소드의 매개변수는 선택적
// 인수가 숫자가 아니면 1이 기본값으로 사용됨
var myObject = {
  value: 0,
  increment: function(inc) {
    this.value += typeof inc === 'number' ? inc : 1;
  }
};

myObject.increment();
document.writeln(myObject.value); // 1

myObject.increment(2);
document.writeln(myObject.value); // 3
```

* 메소드는 자신을 포함하는 객체의 속성들에 접근하기 위해 this를 사용할 수 있다. 즉, this를 사용해 객체의 값을 읽거나 변경할 수 있다
* 자신의 객체 문맥을 this로 얻는 메소드를 public 메소드라고 부른다


### 함수 호출 패턴

```javascript
var sum = add(3, 4);
``` 

* 함수를 이 패턴으로 호출할 때 this는 전역객체에 바인딩된다
* 이러한 언어 설계 상의 결함은 메소드가 내부 함수를 사용해 자신의 작업을 돕지 못하게 만든다
* 내부 함수는 메소드가 객체 접근을 위해 사용하는 this에 자신의 this를 바인딩하지 않고 엉뚱한 값이 전역객체에 연결하기 때문이다

```javascript
// myObject에 double 메소드를 추가
myObject.double = function() {
  var that = this; // 대안
  var helper = function() {
    that.value = add(that.value, that.value);
  };
  helper(); // helper를 함수로 호출
};

myObject.double();
document.writeln(myObject.getValue());
```


### 생성자 호출 패턴 

* 함수를 new라는 전치 연산자와 함께 호출하면, 호출한 함수의 prototype 속성의 값에 연결되는 (숨겨진) 링크를 갖는 객체가 생성되고, 이 새로운 객체는 this에 바인딩된다
```javascript
// Quo라는 생성자 함수를 생성
// 이 함수는 status라는 속성을 가진 객체를 생성
var Quo = function(string) {
  this.status = string;
};

// Quo의 모든 인스턴스에 get_status라는 public 메소드를 제공
Quo.prototype.get_status = function() {
  return this.status;
};

// Quo의 인스턴스 생성
var myQuo = new Quo("confused");

document.writeln(myQuo.get_status()); // confused
```

* new라는 전치 연산자와 함꼐 사용하도록 만든 함수를 생성자(constructor)라고 한다
* 생성자를 new 없이 호출하면 컴파일 시간이나 실행 시간에 어떠한 경고도 없어서 알 수 없는 결과를 초래함
    * 그러므로 대문자 표기법을 사용해 해당 함수가 생성자라고 구분하는 것은 매우 중요
    
    
    
### apply 호출 패턴

* 자바스크립트는 함수형 객체지향 언어이기 때문에 함수는 메소드를 가질 수 있다 
* apply 메소드는 함수를 호출할 때 사용할 인수들의 배열을 받아들인다
* 이 메소드는 this의 값을 선택할 수 있도록 해준다

```javascript
// 숫자 두 개를 가진 배열을 만들고 이를 더함
var array = [3, 4];
var sum = add.apply(null, array);

// status라는 속성을 가진 객체를 만듦
var statusObject = {
  status: 'A-Ok';
};

// statusObject는 Quo.prototype을 상속받지 않지만
// Quo에 있는 get_status 메소드가 statusObject를 대상으로
// 실행되도록 호출 가능
var status = Quo.prototype.get_status.apply(statusObject); // status = 'A-OK'
```