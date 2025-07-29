const gridHeaderData = [
  { title: "운영 기간", desc: ["2024년 7월 21일(월) ~ 12월 31일(수), 총 24주"] },
  { title: "글쓰기 주기", desc: ["각자 설정 (예: 주 1회, 격주 1회 등)"] },
  { title: "진행 채널", desc: ["하코 디스코드 소모임 채널"] },
  { title: "활동 방식", desc: ["개별 발행 + 서로의 글 공유 + 가벼운 피드백"] },
  { title: "공식 회고", desc: ["총 2회 (8주 단위 중간 회고) + 1회 연말 결산"] },
]

const gridContentData = [
  [
    {
      title: "클럽장은", desc: [
        "주간 리마인드 메세지 발송",
        "트래킹 시트 기록"
      ]
    },
    {
      title: "클럽 멤버는", desc: [
        "글을 발행하면 링크와 간단한 코멘트 업로드",
        "자유롭게 서로 읽고, 마음이 닿으면 가벼운 피드백도 OK"
      ]
    },
  ],
  [
    {
      title: "8주마다 중간 회고 (총 2회)", desc: [
        "미니 워크숍 or 비동기 질문지 기반 회고",
        "글쓰기 루틴 돌아보고 개선 포인트 점검"
      ]
    },
    {
      title: "12월 말 연말 결산", desc: [
        "나의 BEST 콘텐츠 선정",
        "다 함께 회고하고 축하하는 자리"
      ]
    },
  ],
]

const GridCell = (data) => {
  return (
    <>
      {
        data.map(({ title, desc }, index) => (
          <div key={index}>
            <h4>{title}</h4>
            {
              desc.map((text, descIndex) => (
                <div key={descIndex} className='content-item'>{text}</div>
              ))
            }
          </div>
        ))
      }
    </>
  )
}

const OperationLayout = () => (
  <div className='operation-grid'>
    <div className='grid-cell grid-header'>
      {GridCell(gridHeaderData)}
    </div>
    <div className='grid-cell section-header'>운영방식</div>
    {
      gridContentData.map((cellData, index) => (
        <div key={index} className='grid-cell grid-content'>
          {GridCell(cellData)}
        </div>
      ))
    }
    <div className='grid-cell grid-footer'>주간 루틴</div>
    <div className='grid-cell grid-footer'>회고와 결산</div>
  </div>
)

export default OperationLayout;