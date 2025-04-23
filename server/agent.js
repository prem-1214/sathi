import dotenv from "dotenv"
import express from "express"
import cors from "cors"

import { GoogleGenerativeAI } from "@google/generative-ai"



dotenv.config({
    path : "./.env"
})




const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

    const gentAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = gentAI.getGenerativeModel({model : "gemini-2.0-flash"})



app.get('/', (req, res) =>{
    res.end("AI home page")
})

app.get('/askAI', (req, res) =>{
    res.end("AI ask page")
})

app.post('/askAI', async (req, res) =>{
    const {prompt} = req.body

    const context = `
    You are an AI assistant specialized in giving advice on AI agents design.
    Always give actionable tips and use simple language.
    `
    const fullPrompt = context + "\n\nUser : " + prompt

    if(!prompt){
        return res.status(400).json({message : "prompt is required..."})
    }

    try {
        const result = await model.generateContent(fullPrompt)
        const responseText = result.response.text()
        console.log("responseText : ", responseText)
        res.json({response : responseText})
    } catch (error) {
        res.status(500).json({message : "Internal server error"})
    }
})



app.listen(process.env.PORT || 8000, () =>{
    console.log(`server is running on port : http://localhost:${process.env.PORT}`)
})
