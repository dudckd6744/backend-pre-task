# backend-pre-task
자버 벡엔드 엔지니어의 사전과제용 repository 입니다.
상세 과제 내용은 [링크](https://www.notion.so/jober/BE-f23a44962dcd48a69e5fb4fa62e26e29)를 통해 확인 할 수 있습니다.

- 준비사항
  - node (로컬 노드 버전을 12 이상으로 설치해주세요)
  - docker desktop
- 실행방법
  1. 각 디렉토리(backend/frontend)에서 `mpm i`을 통해 모듈을 설치
  2. root 디렉토리에서 아래 명령어로 도커 실행
     -  `docker compose -p backend-pre-task -f docker-compose.yml up --build`
  3. 브라우저에서 localhost 에 접속 (80포트) 
- 종료 방법
  - 컨테이너가 실행중인 터미널에서 `ctl + c` 명령어를 통해 컨테이너 종료
- 컨테이너 삭제
  - /scripts 하위의 sql 파일이 업데이트 되면 도커 볼륨을 제거 후 다시 마운팅 해야 하므로 docker compose down 으로 컨테이너를 내리고 다시 실행시켜 주세요.  
  - `docker compose -p backend-pre-task down`
