# k8s에 배포될 Backend 오브젝트의 yaml 파일

- gate.yaml
  - API 게이트웨이
- distributor.yaml
  - gate, backend app을 노드로 접속받아 각 요청을 분산하는 서비스
