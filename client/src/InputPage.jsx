import React, { useState } from 'react'

const AIInputPage = () => {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setResponse('')
    
    if (!prompt.trim()) {
      setError('Please enter a prompt.')
      return
    }

    setLoading(true)

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/askAI`, {
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
        setError('No response from AI.')
      }
    } catch (err) {
      setError('Error: ' + err.message)
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
          style={{ width: '100%', padding: 10 }}
          placeholder="Enter your query for the AI..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit" disabled={loading} style={{ marginTop: 10 }}>
          {loading ? 'Thinking...' : 'Submit'}
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: 20 }}>{error}</p>}

      {response && (
        <div style={{ marginTop: 30 }}>
          <h4>AI Response:</h4>
          <div style={{ whiteSpace: 'pre-wrap', background: '#f5f5f5', padding: 10, borderRadius: 5 }}>
            {response}
          </div>
        </div>
      )}
    </div>
  )
}

export default AIInputPage
