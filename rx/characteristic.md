# Rx 특징

다양한 형태의 데이터를 처리하기 위한 일관된 방식을 제공하며 이를 통해 안전하고 통일된 데이터 처리가 가능

## Callback Function

에러 처리가 어렵고 콜백 지옥 등의 문제가 발생

## Promise

- 한 번에 하나의 데이터를 처리하기 때문에 연속성을 갖는 데이터 처리 불가능
- 이미 서버로 보낸 요청 취소 불가능

## Observable

동기/비동기와 관계없이 데이터를 생산하는 것이라면 무엇이든 처리 가능
(배열, 함수 반환값과 같은 동기 데이터와 Ajax 통신 결과, 사용자 이벤트와 같은 비동기 데이터 등 여러 가지의 유형의 데이터 처리 가능)
시간을 축으로 연속적인 데이터를 저장하는 컬렉션을 표현한 객체

## Operator

**Observable**을 생성 및 조작하는 함수
오퍼레이터는 현재의 **Observable** 인스턴스를 기반으로 항상 새로운 **Observable** 인스턴스를 반환한다.

## Observer

**Observable**에 의해 전달된 데이터를 소비하는 주체
**Observer**는 **Observable**과 **subscribe** 함수를 통해 연결됨

## Subscription

**Observable.prototype.subscribe**의 반환값
자원의 해체를 담당함
