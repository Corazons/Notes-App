import express from "express"
import route from "./routes/noteRoute.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import "dotenv/config"

const app = express()
const port = 3000

app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}))
app.use(express.json())
app.use(route)

app.listen(port, () => {
    console.log("Server Berjalan di Port " + port)
})