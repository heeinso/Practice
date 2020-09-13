# 메모이제이션 \(Memoization\)

* 함수는 불필요한 작업을 피하기 위해서 이전에 연산한 결과를 저장하고 있는 객체를 사용할 수 있다
* 이러한 최적화 기법을 메모이제이션이라고 한다
* 자바스크립트의 객체와 배열은 메모이제이션에 매우 유용하다

```javascript
var fibonacci = function(n) {
  return n < 2 ? n : fibonacci(n-1) + fibonacci(n-2);
};

for (var i=0; i<=10; i++) {
  console.log('// ' + i + ': ' + fibonacci(i));
}
```

> 위 예제는 잘 동작하지만 처리해야 하는 작업이 꽤 많다. 자그만치 fibonacci 함수를 453번이나 호출해야 한다. 여기에서 11번은 직접 호출한 것이고 나머지 442번은 이미 계산한 값들을 다시 계산하기 위해 호출한 것이다.

* 이전에 작업한 결과는 클로저를 통해 숨겨지는 memo라는 배열에 저장할 것이다
* 함수가 호출되면 제일 먼저 결과가 저장돼 있는지를 살피고 만약 결과가 있는 경우 연산을 수행하지 않고 바로 결과를 반환한다

```javascript
var fibonacci = function() {
  var memo = [0, 1];
  var fib = function(n) {
    var result = memo[n];
    if (typeof result !== 'number') {
      result = fib(n-1) + fib(n-2);
      memo[n] = result;
    }
    return result;
  };
  return fib;
}();
```

* 이러한 메모이제이션 작업은 메모이제이션 함수를 만들 수 있게 도와주는 함수를 만들어서 일반화할 수 있다. 다음 예제의 memoizer 함수는 결과를 저장할 배열과 메모이제이션을 할 함수를 인수로 받는다. 그 다음 memo에 저장되는 데이터를 관리하고 필요할 경우 fundamental 함수를 호출하는 shell 함수를 반환한다. shell 함수와 함수가 받게 되는 인수는 fundamental 함수에 전달한다.

```javascript
var memoizer = function(memo, fundamental) {
  var shell = function(n) {
    var result = memo[n];
    if (typeof result !== 'number') {
      result = fundamental(shell, n);
      memo[n] = result;
    }
    return result;
  };
  return shell;
};

var fibonacci = memoizer([0, 1], function(shell, n) {
  return shell(n-1) + shell(n-2);
});

var factorial = memoizer([1, 1], function(shell, n) {
  return n * shell(n-1);
});
```

