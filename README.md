# HLcopyBot

TUkorea - graduation project - 이정준 교수 2팀

## copy api 설정, 사용 방법

### 1. DB_connect/db_info.js에서 본인의 로컬db의 정보를 입력해준다.

### 2. 원하는 데어터를 얻기위한 url을 확인한다.

- 제작된 api :
- localhost:3000/api/LT_history => 테이블의 ct_leader_history 를 모두 조회
- localhost:3000/api/LT_info => 테이블의 ct_leader 를 모두 조회

### 3. api의 디렉토리에서 npm start를 하여 api를 가동시킨다.

(이때 로컬 db가 작동중인지 확인해야함)

### 전체적인 구조 설명

- bin/www : 실제로 실행되는 api 서버, port설정, app생성
- app.js : express app이 존재하는 파일, 라우팅 설정
- routes/ : 분기처리되는 라우터들이 존재하는 디렉토리, 신규api 생성시 여기에 추가
- DB_connect : DB정보와 DB연결을 담당

### api requset, response 예시

- 로컬 db상태
    - 데이터 베이스 이름 : test_db
    - 사용 테이블
        - ct_leader_history : 리더트레이더 거래기록 테이블
        - ct_leader :  리더트레이더 정보 테이블

- 리더트레이더 거래 기록 조회
    - method  : GET
    - 요청 url : localhost:3000/api/LT_history
    - 응답
        
        ```json
        {
            "LEADER_HISTORY_SEQ": 3,
            "LEADER_SEQ": 1,
            "HISTORY_NUM": "01",
            "TRADE_TYPE": "TT01",
            "TRADE_SYMBOL": "test_sym",
            "TRADE_MARKET": "test_market",
            "TRADE_PRICE": "10000",
            "TRADE_VOLUME": 10,
            "REG_DT": "2022-07-14T06:52:32.000Z"
        }
        ```
        

- 리더트레이더 정보 조회
    - method : GET
    - 요청 url : localhost:3000/api/LT_info
    - 응답 :
        
        ```json
        {
            "LEADER_SEQ": 1,
            "LEADER_UID": "1",
            "LEADER_NAME": "test_leader",
            "LEADER_IMAGE": null,
            "LEADER_CAPACITY": 999,
            "LEADER_PRICE": "99",
            "LEADER_AMOUNT": "100000",
            "EXCHANGE_TYPE": "ET01",
            "ACCESS_KEY": "test_a_k",
            "SECRET_KEY": "test_s_k",
            "TRADER_ST": "RS01",
            "REG_DT": "1999-10-12T06:51:24.000Z",
            "MOD_DT": "2021-10-12T06:51:31.000Z"
        }
        ```
