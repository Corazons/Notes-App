import express from "express"
import "dotenv/config";
import authMiddleware from "../middlewares/authMiddleware.js"
import {
  register,
  login,
  refresh,
  createNote,
  getAllNotes
} from "../controllers/noteController.js"

const router = express.Router()

router.get('/',(req, res) => {
    res.send("<h1>HELLO WORLD</h1>")
    console.log('=== check collection ===')
})

//read note by user id
router.get('/api/notes/:userId', (req, res) => {
    res.send(req.params)
})

//create note
router.post('/api/notes', (req, res) => {
    const body = req.body
    console.log(body)
    res.status(201).json(body)
})

router.post('/register', register)
router.post('/login', login)
router.post('/refresh', refresh)
router.post('/notes', createNote)
router.get('/notes', getAllNotes)
router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    message: "Profile berhasil diakses",
    user: req.user
  })
})

router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken")
  res.sendStatus(204)
})

export default router