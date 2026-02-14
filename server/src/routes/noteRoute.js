import express from "express"
import "dotenv/config";
import authMiddleware from "../middlewares/authMiddleware.js"
import {
  register,
  login,
  refresh,
  getMe,
  createNote,
  getAllNotes,
  updateNote,
  deleteNote
} from "../controllers/noteController.js"

const router = express.Router()

router.get('/',(req, res) => {
    res.send("<h1>HELLO WORLD</h1>")
})

//user
router.post('/api/register', register)
router.post('/api/login', login)
router.post('/api/refresh', refresh)
router.get('/api/me', authMiddleware, getMe)

//notes
router.post('/api/notes',authMiddleware, createNote)
router.get('/api/notes', authMiddleware, getAllNotes)
router.put('/api/notes/:id', authMiddleware, updateNote)
router.delete('/api/notes/:id', authMiddleware, deleteNote)

router.post("/api/logout", (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "lax",
    secure: false // true kalau HTTPS
  })
  res.sendStatus(204)
})

export default router