# 참조 \(Reference\)

* 객체는 참조 방식으로 전달된다. 결코 복사되지 않는다

  ```javascript
  var x = stooge;
  x.nickname = 'Curly';
  var nick = stooge.nickname;
  // x와 stooge가 모두 같은 객체를 참조하기 때문에
  // 변수 nick의 값은 'Curly'
  var a = {}, b = {}, c = {};
  // a, b, c는 각각 다른 빈 객체를 참고
  a = b = c = {};
  // a, b, c는 모두 같은 빈 객체를 참조
  ```

