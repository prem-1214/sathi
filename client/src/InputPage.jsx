import React, { useState } from 'react'

const AIInputPage = () => {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!prompt) return

    setLoading(true)
    setResponse('')

    try {
      const res = await fetch('http://localhost:5000/askAI', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      const data = await res.json()
      if (data.response) {
        setResponse(data.response)
      } else {
        setResponse('No response from AI.')
      }
    } catch (err) {
      setResponse('Error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
      <h2>Ask the AI Agent</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows={4}
          style={{ width: '100%' }}
          placeholder="Enter your prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit" disabled={loading} style={{ marginTop: 10 }}>
          {loading ? 'Thinking...' : 'Submit'}
        </button>
      </form>

      {response && (
        <div style={{ marginTop: 20 }}>
          <h4>Response:</h4>
          <p>{response}</p>
        </div>
      )}
    </div>
  )
}

export default AIInputPage
