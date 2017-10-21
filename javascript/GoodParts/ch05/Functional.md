## 함수를 사용한 방식

* 자바스크립트 프로토타입에 의한 상속 패턴의 한 가지 단점은 private 속성을 가질 수 없다는 것

**솔루션**

1. 새로운 객체를 생성한다 (객체 리터럴 / new 연산자 사용하면서 생성자 함수 호출 / 기존 객체에서 새로운 인스턴스 만드는 Object.create 메소드 사용 / 객체를 반환하는 함수를 호출)

2. 필요한 private 변수와 메소드를 정의 (이것들은 단지 함수 안의 일반적인 변수들)

3. that에 새로운 객체를 할당하고 메소드를 추가함 (이 때 추가되는 메소드들은 함수의 매개변수와 두 번째 단계에서 정의한 변수들을 접근할 수 있는 권한을 가짐)

4. 새로운 객체 that을 반환한다


```javascript
var mammal = function(spec) {
  var that = {};
  
  that.get_name = function() {
    return spec.name;
  };
  
  that.says = function() {
    return spec.saying || '';
  };
  
  return that;
};

var myMammal = mammal({name: 'Herb'});

Object.method('superior', function(name) {
  var that = this,
  method = that[name];
  return function() {
    return method.apply(that, arguments);
  };
});

var coolcat = function(spec) {
  var that = cat(spec),
  super_get_name = that.superior('get_name');
  that.get_name = function(n) {
    return 'like' + super_get_name() + ' baby';
  };
  return that;
};

var myCoolCat = coolcat({name: 'Bix'});
var name = myCoolCat.get_name(); // like meow Bix meow baby
```

