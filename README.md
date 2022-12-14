# KaKao 2차 코딩 테스트 템플릿

## branch 종류
- kakao-2023-while: while로 만들어진 템플릿
- kakao-2023-recursive: 재귀로 만들어진 템플릿
- kakao-2023-typescript: 타입스크립트로 만들어진 템플릿(재귀)
- kakao-2023-test: 실제 코딩테스트 때 풀이했던 코드

### javascript 템플릿
아무런 설정 없이 타입 추론을 이용할 수 있도록 jsdoc과 
타입은 types.d.ts에 선언하고 import 해서 사용했습니다. (declare 사용해서 import 없이 사용하는 게 더 편한데, 생각을 못 했습니다...)


### typescript 템플릿
작은 프로그램을 만드는 것인데 타입스크립트까지 사용할 필요가 있을지 많이 고민한 후, 저는 javascript를 사용하기로 했습니다.
정말 타입이 필요하다면 아무런 설정이 필요 없는 jsdoc을 사용하는 게 더 나은 선택일 것 같습니다.

## 사용했던 브랜치
저는 kakao-2023-recursive로 만들어진 브랜치를 따서 실제 문제 풀이할 때 사용했습니다.

typescript를 사용하지 않은 이유는 문제 풀이 막바지에 급하게 코딩할 때, 타입 오류 때문에 시간이 많이 지체될 것 같아서 사용하지 않았습니다. 그래도 jsdoc을 사용해서, 일부 코드의 타입 추론과 생산성 둘 다 챙기려고 노력했습니다.

템플릿은 크게 재귀를 사용한 것과 while을 사용한 것 두 가지 버전이 존재합니다.

첫 번째로 만든 건 재귀 템플릿입니다. 꼬리 재귀 최적화를 고려해서 this.run 메소드를 마지막에 호출하도록 했는데, 검색해보니 node는 안 된다고 합니다.
또한 재귀호출로 인한 스택 오버플로우도 걱정돼서 while로 한 번 더 만들었습니다.

스택 오버플로우 관련해서 검색해보니 문제 풀이할 때 스택 오버플로우 에러가 생길 경우는 낮아 보였습니다. 또한 while과 재귀 간에 속도 차이가 나는지 직접 성능 테스트해 보니 유의미한 차이가 없어서 코드가 더 깔끔한 재귀를 사용하기로 했습니다.

타입스크립트도 ts-node 위에서 성능 테스트를 해봤는데, 차이가 없었습니다. 타입스크립트는 사람이 없는 시간대인 새벽에 테스트해서 그런지 오히려 빨랐습니다.
