import express from "express"
import route from "./routes/route.js"
import cors from "cors";
import dotenv from "dotenv";

const app = express()
const port = 3000
app.use(cors())
app.use(express.json());
app.use(route)

app.listen(port, () => {
    console.log("Server Berjalan di Port " + port)
})