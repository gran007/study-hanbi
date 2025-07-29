const data = {
  header: ["세션", "다룰 내용", "소요 시간"],
  body: [
    ["1. 클럽 소개", "클럽 운영 방식과 철학에 대하여", "21:00 - 21:10 (10분)"],
    ["2. 미니 워크숍", "MECE 원칙과 글을 쓸 때 우리가 자주 저지르는 실수에 대하여", "21:10 - 21:25 (15분)"],
    ["3. 선언문 발표", "선언문을 발표함으로써 스스로는 책임을 갖고 타인으로부터 자극 받기", "21:25 - 22:00 (35분)"],
  ]
}

const TimeTable = () => {
  const {header, body} = data;
  return (
    <table className='schedule-table'>
      <thead>
        <tr>
          {header.map((text, index)=>(<th key={index}>{text}</th>))}
        </tr>
      </thead>
      <tbody>
        {body.map((item, trIndex)=>(
          <tr key={trIndex}>
            {item.map((text, tdIndex)=>(
              <td key={tdIndex}>{text}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TimeTable;