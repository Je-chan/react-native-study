# 1. Firebase란?

- 구글에서 만든 BAAS(Backend As A Service)
- 모바일에서 필요한 대부분의 기능을 제공

## 1-1) Realtime Database

- 실시간으로 접근할 수 있는 Database
- NoSQL 형태
- JSON Object 로 데이터를 저장
- 클라이언트에서 직접 접근도 가능
- 단, 동시 연결수 제한이 있고 Write 는 한 번에 1MB 내외 정도
- 정렬, 필터링, 조건문이 불가능하다
- 용량 또는 데이터 크기에 따라 과금이 된다

## 1-2) Storage

- 파일 저장을 위해서 사용한다
- 프로필 사진, 임시 저장하는 파일 저장 기능 등을 제공한다

## 1-3) Cloud Firestore

- 데이터를 저장하기 위한 제품
- 실시간성, NoSQL 을 지원한다는 점은 Realtime Database 와 비슷
- 하지만, Collection 과 Document 라는 단위를 가지고 있음
  - Document : Data 집합 단위
  - Collection : Document 집합 단위
- 데이터를 저장할 때는 Document 단위로 저장한다
- 정렬, 필터링, 조건문이 가능하다
- document CRUD 횟수에 따라 과금된다
  - 즉, 데이터가 작고 CRUD 가 자주 발생하면 Realtime Database를
  - 큰 단위 데이터 요청에서는 Cloud Firestore 를 사용하는 것이 합리적
