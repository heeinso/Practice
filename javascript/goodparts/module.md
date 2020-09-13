# 모듈 \(Module\)

* 모듈의 일반적인 패턴은 private 변수와 함수를 정의하는 함수이다
* 클로저를 통해 private 변수와 함수에 접근할 수 있는 권한이 있는 함수를 생성하고 이 함수를 반환하거나 접근 가능한 장소에 이를 저장하는 것이다
* 모듈 패턴을 사용하면 전역변수 사용을 없앨 수 있고, 정보은닉과 그 외 다른 좋은 설계 방식을 따를 수 있으며, 애플리케이션이나 다른 싱글톤 패턴들을 효과적으로 캡슐화할 수 있게 한다

```javascript
var serial_maker = function() {
  // 유일한 문자열을 생성하는 객체 생성
  // 유일한 문자열은 접두어와 연속된 숫자 두 부분으로 구성됨
  // 객체에는 접두어와 연속된 숫자를 설정하는 메소드와
  // 유일한 문자열을 생성하는 gensym 메소드가 있음

  var prefix = '';
  var seq = 0;
  return {
    set_prefix: function(p) {
      prefix = String(p);
    },
    set_seq: function(s) {
      seq = s;
    },
    gensym: function() {
      var result = prefix + seq;
      seq++;
      return result;
    }
  };
};

var seqer = serial_maker();
seqer.set_prefix('Q');
seqer.set_seq(1000);
var unique = seqer.gensym();
```

