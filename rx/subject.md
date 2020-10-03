## Subject

**Subject**는 대표적인 **Hot Observable**
**Hot Observable**은 구독하는 대상자들과 데이터를 함께 공유하기 때문에 구독하기 전에 전달된 값은 얻을 수 없음
Rxjs에서는 데이터도 공유하면서 필요한 경우 구독 전의 데이터를 공유할 수 있도록 다양한 Subject를 제공

### BehaviorSubject

데이터가 전달되기 전에 구독되어 있었다면 구독된 대상에게 초깃값을 전달함
데이터가 전달된 후부터는 구독 시점과 상관없이 마지막 상태를 전달
(getValue 메소드를 제공하여 마지막 값을 얻을 수 있음)

### ReplaySubject

bufferSize만큼 데이터를 저장하고 있다가 구독될 때 가장 최근 bufferSize만큼 데이터를 전달함
windowTime을 지정할 수 있어서 전달된 시각을 기준으로 데이터를 보관 가능

### AsyncSubject

complete이 호출되었을 때 마지막 하나의 값만 next 하고 complete 됨
complete 되지 않으면 어떤 데이터도 전달하지 않음

### publish와 Subject

```javascript
publishBehavior(value); // multicat(new BehaviorSubject(value))의 alias
```

```javascript
publishReplay(bufferSize, windowTime); // multicat(new ReplaySubject(bufferSize, windowTime))의 alias
```

```javascript
publishLast(); // multicat(new AsyncSubject())의 alias
```
