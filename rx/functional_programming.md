# 함수형 프로그래밍

함수형 프로그래밍은 자료 처리를 수학적 함수의 계산으로 취급하고 상태 변경과 가변 데이터를 피하려는 프로그래밍 패러다임의 하나이다.

### 수학적 함수의 계산

함수의 합성 및 변경을 통해 반복문이나 조건문과 같은 로직의 복잡성을 더하는 문제를 손쉽게 해결

### 상태 변경과 가변 데이터 X

순수 함수를 사용해 변경해야할 상태가 사라짐

- 같은 입력이 주어지면, 항상 같은 출력을 반환한다
- 부작용을 발생시키지 않는다
- 외부의 가변 데이터에 의존하지 않는다

## RxJS

**RxJS**의 **Observable**은 고차 함수와 같은 오퍼레이터를 제공하고, 이로 인해 생성된 **Observable**은 항상 불변 객체를 반환한다.
오퍼레이터의 인자로 순수 함수를 받음으로써 부작용을 제거
**Observable**을 통해 전달된 데이터를 합성하거나 분리하고 변환함으로써 로직을 보다 단순하게 만듦
