# HLcopyBot
TUkorea - graduation project - 이정준 교수 2팀

## copy api 설정, 사용 방법

### 1. DB_connect/db_info.js에서 본인의 로컬db의 정보를 입력해준다. 

### 2. 원하는 데어터를 얻기위한 url을 확인한다.
- 제작된 api : 
- localhost:3000/api/LT_history   => 테이블의 ct_leader_history 를 모두 조회
- localhost:3000/api/LT_info   => 테이블의 ct_leader 를 모두 조회

### 3. api의 디렉토리에서 npm start를 하여 api를 가동시킨다.
(이때 로컬 db가 작동중인지 확인해야함)

### 전체적인 구조 설명 
  - bin/www : 실제로 실행되는 api 서버, port설정, app생성
  - app.js :  express app이 존재하는 파일, 라우팅 설정
  - routes/ : 분기처리되는 라우터들이 존재하는 디렉토리, 신규api 생성시 여기에 추가
  - DB_connect : DB정보와 DB연결을 담당

