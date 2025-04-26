import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AIInputPage from './InputPage'
import Home from './Home'


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
