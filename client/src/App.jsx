import { useState } from 'react'
import './App.css'
import InputPage from './InputPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <InputPage />
    </>
  )
}

export default App
