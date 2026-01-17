import express from "express"
import route from "./routes/noteRoute.js"
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express()
const port = 3000

app.use(cors())
app.use(express.json());
app.use(route)

app.listen(port, () => {
    console.log("Server Berjalan di Port " + port)
})