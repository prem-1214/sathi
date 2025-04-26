import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
        <div style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
            <h1>Welcome to the AI Agent</h1>
            <p>This is a simple AI agent that can answer your questions.</p>
            <Link to="/askAI" style={{ textDecoration: 'none', color: 'blue' }}>
            Go to AI Input Page
            </Link>
        </div>
    </>
  )
}

export default Home