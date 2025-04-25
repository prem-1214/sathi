import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import { GoogleGenerativeAI } from "@google/generative-ai"

dotenv.config({ path: "./.env" })

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (!process.env.GEMINI_API_KEY) {
  console.error("❌ Missing GEMINI_API_KEY in .env")
  process.exit(1)
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

app.post('/', async (req, res) => {
  const { prompt } = req.body

  const context = `
  You are an AI assistant specialized in giving advice on AI agents design.
  Always give actionable tips and use simple language.
  `
  const fullPrompt = context + "\n\nUser: " + prompt

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" })
  }

  try {
    const result = await model.generateContent(fullPrompt)
    const responseText = result.response.text()
    res.json({ response: responseText })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})
