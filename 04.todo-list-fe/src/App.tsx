import './App.css'
import { Routes, Route } from 'react-router-dom';
import { Main, Login } from './01.pages'

function App() {

  return (
      <div>
        <Routes>
          <Route path='/auth' element={<Main />}/>
          <Route path='/' element={<Main />}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </div>
  )
}

export default App
