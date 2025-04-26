import React, { useState } from 'react'

const AIInputPage = () => {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [typedResponse, setTypedResponse] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setResponse('')
    setTypedResponse('')
    
    if (!prompt.trim()) {
      setError('Please enter a prompt.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/askAI`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      setPrompt('')
      
      const data = await response.json()
      if (data.response) {
        setResponse(data.response)
        setTypedResponse('') 
        handleAnimateResponse(data.response)
        console.log('Response:', data.response)
      } else {
        setError('No response from AI.')
      }
    } catch (err) {
      setError('Error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAnimateResponse = (text) =>{
    let index = 0 
    const speed = 1

    const typingInterval = setInterval(() =>{
      if(index < text.length){
      setTypedResponse((prev) => prev + text[index])
      index++
      }else{
        (index === text.length)
        clearInterval(typingInterval)
      }
    }, speed)
  }

  return (
    <div className='flex flex-col items-center pt-20'>
      <h2 className='text-black text-3xl font-black'>Ask Your Sathi</h2>
      {typedResponse && (
    <div className="w-7xl mt-10 max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h4 className="text-2xl font-bold text-gray-800 mb-4">Sathi says</h4>

        <div className="bg-gray-50 rounded-xl p-5 text-gray-700 leading-relaxed text-lg font-[500] whitespace-pre-line">
           {typedResponse}
        </div>
    </div>
)}
      <form onSubmit={handleSubmit} 
        className='flex flex-col'
      >
        <textarea
          placeholder="Enter your query for the AI..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className='border resize-none mt-20 w-4xl h-16 rounded-xl p-1'
        />
        <button type="submit" disabled={loading} 
          className='h-10 bg-blue-500 rounded-3xl text-white m-10  cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out ' 
        >
          {loading ? 'Let me Think . . .' : 'Submit'}
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: 20 }}>{error}</p>}

    </div>
  )
}

export default AIInputPage
