import './App.css'
import Home from './Home'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AIInputPage from './InputPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/askAI' element={<AIInputPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
