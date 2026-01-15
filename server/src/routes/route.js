import express from "express"

const router = express.Router()

router.get('/api/notes', (req,res) => {
    console.log("Hellow")
})

router.post('/api/notes', (req, res) => {
    const body = req.body
    console.log(body)
    res.status(201).json(body)
})

export default router