# KaKao 2차 코딩 테스트 템플릿

## branch 종류
- kakao-2023-while: while로 만들어진 템플릿
- kakao-2023-recursive: 재귀로 만들어진 템플릿
- kakao-2023-typescript: 타입스크립트로 만들어진 템플릿(재귀)
- kakao-2023-test: 실제 코딩테스트 때 풀이했던 코드

### javascript 템플릿
- 아무런 설정없이 타입추론을 이용할 수 있도록 jsdoc 사용.
- types.d.ts에 타입 선언하고 import해서 사용했습니다. (declare 사용해서 import 없이 사용하는게 더 편한 것 같아요.)
- while, recursion에 따라 입맛에 맞게 사용 가능..?


## 사용했던 브랜치
저는 kakao-2023-recursive로 만들어진 브랜치를 따서 실제 문제 풀이할 때 사용했습니다.

typescript를 사용하지 않은 이유는 문제 풀이 막바지에 급하게 코딩할 때, 타입 오류 때문에 시간이 많이 지체 될 것 같아서 사용하지 않았습니다.
그래도 jsdoc을 사용해서, 안전성과 생산성 둘 다 챙길려고 노력했습니다.

크게 재귀를 사용한 것과 while를 사용한 것 두 가지 버전이 존재합니다.

첫번째로 만든 건 재귀 템플릿입니다. 당연히 꼬리 재귀 최적화 될 줄 알고 마지막에 함수 호출하도록 했는데, 검색해보니 node는 안된다고 해서..
안 믿겨서 실제로 디버깅 돌려서 확인해봤는데, 실제로 스택을 계속 쌓고 있는 것을 확인했습니다.
또한 재귀호출로 인한 스택 오버플로우도 걱정되서 while로 한번 더 만들었습니다. 

스택 오버플로우 관련해서 검색해보니 문제풀이 할 때 스택 오버플로우 에러가 생길 경우는 낮아보였습니다. 
또한 while과 재귀간에 속도 차이가 나는 지 직접 성능 테스트 해보니 유의미한 차이가 없어서 깔끔해보이는 재귀 사용하기로 결정했습니다. 

타입스크립트도 성능 테스트를 해봤는데, 차이가 없었습니다. 타입스크립트는 사람이 없는 시간 대인 새벽에 테스트를 해서 그런지 오히려 빨랐습니다.

## 아쉬움
두 시나리오를 한 번에 실행시킬 수 있을 것 같은데, 템플릿 준비할 때랑, 문제 풀 때 생각을 못했습니다..

