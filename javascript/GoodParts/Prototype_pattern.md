## 프로토타입 방식

* 순수한 프로토타입 기반 패턴에서는 클래스가 필요없다
* 새로운 객체는 기존 객체의 속성들을 상속받을 수 있다

```javascript
var myMammal = {
  name: 'Herb the Mammal',
  get_name: function() {
    return this.name;
  },
  says: function() {
    return this.saying || '';
  }
};
```

* 일단 위와 같은 객체를 생성하고 나면 Object.create 메소드를 사용해 이 객체의 더 많은 인스턴스를 만들 수 있다
* 그 후 이렇게 새로 만든 인스턴스를 필요에 맞게 맞춤화할 수 있다. 즉 인스턴스에 원하는 대로 메소드나 속성들을 추가할 수 있다

```javascript
var myCat = Object.create(myMammal);
myCat.name = 'Henrietta';
myCat.saying = 'meow';

myCat.purr = function(n) {
  var i, s = '';
  for (i=0; i<n; i++) {
    if (s) {
      s += '-';
    }
    s += 'r';
  }
  return s;
};

myCat.get_name = function() {
  return this.says + ' ' + this.name + ' ' + this.says()
}
```