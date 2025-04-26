import './App.css'

import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AIInputPage from './InputPage'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/askAI' element={<AIInputPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
