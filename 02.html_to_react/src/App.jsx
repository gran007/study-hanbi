import './App.css'
import Header from './01.header'
import SectionTitle from './02.section-title'
import TimeTable from './03.time-table'
import OperationLayout from './04.operation-layout'
import InfoBlock from './05.info-block'

const MECE = () => {
  return (
    <article className="info-block workshop-block">
      <h3 className="block-title">MECE 소개</h3>
      <h4 className="concept-title">가로 노드는 겹치지 않게, 부모 노드는 자식 노드의 요약</h4>
      <div className="example-section">
        <img src="./example.png" alt="MECE 원칙 예시" className="concept-image" />
      </div>
    </article>
  )
}

const workShopData = [
  {
    title: "'TIL' 쓸 때는 말이야",
    conceptTitle: "내가 한 것(Doing)과 이해한 것(Knowing)을 분리하자",
    example: [
      {
        title: "나쁜 예시", code: `## 오늘 배운 것
- 백엔드랑 프론트엔드가 왜 나뉘었는지 배웠다.
- Next.js 기초 실습했다.
- Docker랑 MySQL 환경 구축해봤다.
- Spring + Kotlin 프로젝트 만들고 구조 파악했다.

## 깨달은 점
- App Router 구조가 재밌었다.
- Docker는 설정이 더 중요.
- CSS 모듈 쓰면 클래스 충돌 안 나서 좋다.`},
      {
        title: "좋은 예시",
        code: `# TIL - 웹서비스 구조 & Next.js / Docker / Spring 기초 실습

## 1. 오늘 한 것 (What I Did)
- Next.js 프로젝트 생성 및 App Router 구조 실습
- style.module.css로 모듈형 스타일링 실습
- Docker + MySQL 로컬 환경 구성
- Spring + Kotlin 기반 웹 프로젝트 생성 및 구조 파악

## 2. 새로 이해한 것 (What I Learned)

### 웹서비스 구조의 진화
- 프론트/백 분리는 역할 분담 + 복잡도 분산을 위한 구조적 진화
- '백'은 데이터·비즈니스 로직 / '프론트'는 사용자 인터페이스
- 인프라(Docker)는 실행 환경을 추상화해 일관성 유지

### Next.js 구조 이해
- app/ 폴더 구조가 URL과 1:1 대응 (폴더 = 라우트)
- layout.tsx에 공통 UI 배치 → 모든 페이지에 자동 적용
- usePathname()으로 현재 URL 따라 네비게이션 렌더링 가능

→ **페이지 구조 먼저 생각하도록 유도**하는 설계

## 3. 남은 의문 / 다음 학습
- Spring ORM에서 Entity와 DB 테이블의 매핑 관계가 어떻게 동작하는지 더 깊이 이해 필요
- Next.js에서 dynamic route나 middleware는 어떻게 작동하는지 학습 예정`
      }
    ]
  },
  {
    title: "'작업기' 쓸 때는 말이야",
    conceptTitle: "프로젝트 작업기는 실시간 중계가 아니다",
    example: [
      {
        title: "나쁜 예시", code: `# 오픈소스 기여 중 겪었던 마이그레이션 이야기

1. Quill.js 2.0.3을 도입하려 했으나 Yorkie는 1.3.7만 지원.
2. Quill.js 처음 써봐서 막막했지만 일단 간단한 에디터 만들어봄.
3. 욕심 부리지 않고 1.3.7 기준 예제를 Next.js로 마이그레이션.
4. Delta 변경이 큰 장벽이었고 문서도 미흡함.
5. Quill.js v2 변경사항은 Op 타입으로 대체된 것이 핵심.
6. 최종적으로 Yorkie 리포에 PR 머지됨!`},
      {
        title: "좋은 예시",
        code: `# [마이그레이션 작업기] Yorkie x Quill.js 예제를 Next.js 환경으로 옮기며 배운 것들

## 1. 목적
- Yorkie의 텍스트 협업 기능을 **Next.js + Quill.js 환경**에서 활용 가능하게 하기
- Quill 2.0.3 버전 기반의 공식 예제가 없어, **직접 마이그레이션하고 OSS에 기여**하는 것을 목표로 함

## 2. 마이그레이션 과정에서 맞닥뜨린 문제

### 문제 1. 공식 예제는 Quill.js 1.3.7 기반
- 내가 원하는 기능(복수 에디터 지원)은 2.0.3에 포함
- 하지만 Yorkie는 1.3.7에만 최적화되어 있어 문서/예제가 없음

### 문제 2. Quill.js의 Delta 타입과 Yorkie 연동 방식 불일치
- Quill 2.x에서 Delta 구조 변경 (DeltaOperation → Op)
- insert/retain 처리 방식이 달라짐
- 문서에는 해당 차이가 명확히 설명되어 있지 않음

## 3. 해결 전략

### 전략 1. 욕심 버리고 단계별 마이그레이션
- 처음부터 React+Yorkie+Quill 2.0.3은 과욕
- → **기존 vanilla 예제를 React 환경으로 이식**
- 이후 Yorkie의 React SDK로 리팩토링

## 4. 배운것
- Quill.js 2.x 주요 개선: 타입스크립트 완전 지원, 중첩/복수 에디터 지원, ESM 대응
- 마이그레이션 전략: 버전 변경과 프레임워크 변경을 동시에 하지 않는다
- OSS 기여 포인트: "내가 필요한 것"에서 출발 → "공식 예제 개선"까지 기여 확대 가능

## 5. 회고
- 다른 사람이 막막해할 만한 지점은 나도 막막했다. 그래서 해결한 과정을 문서화하고 기여로 연결할 수 있었다.`
      }
    ]
  }
]

const WorkShop = () => {
  return (
    workShopData.map(({ title, conceptTitle, example }, index) => (
      <article key={index} className="info-block">
        <h3 className="block-title">{title}</h3>
        <h4 className="concept-title">{conceptTitle}</h4>
        {
          example.map(({ title, code }, exampleIndex) => (
            <div key={exampleIndex} className='example-code'>
              <h5 className="example-title">{title}</h5>
              <pre className={`code-example ${exampleIndex === 0 ? 'top' : ''}`}>
                <code>{code}</code>
              </pre>
            </div>
          ))
        }
      </article>
    ))
  )
}

function App() {

  return (
    <main className='container'>
      <Header />
      <SectionTitle name={"1. 클럽 소개"} />
      <TimeTable />
      <OperationLayout />
      <InfoBlock />
      <SectionTitle name={"2. 미니 워크숍"} subTitle={"개발자들이여 보라!"} />
      <MECE />
      <WorkShop />
      <SectionTitle name={"3. 선언문 발표"} subTitle={"용기 있게 나오세요!"} />
      <article className="info-block declaration-block">
        <img src="./brave.jpg" alt="용기있게 나오세요" className="concept-image" />
      </article>
    </main>
  )
}

export default App
