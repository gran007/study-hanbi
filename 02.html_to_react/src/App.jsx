import './App.css'
import Header from './01.header'
import SectionTitle from './02.section-title'
import TimeTable from './03.time-table'
import OperationLayout from './04.operation-layout'
import InfoBlock from './05.info-block'
import MECE from './06.mece'
import WorkShop from './07.workshop'

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
