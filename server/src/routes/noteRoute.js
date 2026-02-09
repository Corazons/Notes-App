import express from "express"
import "dotenv/config";
import authMiddleware from "../middlewares/authMiddleware.js"
import {
  register,
  login,
  refresh,
  createNote,
  getAllNotes,
  updateNote,
  deleteNote
} from "../controllers/noteController.js"

const router = express.Router()

router.get('/',(req, res) => {
    res.send("<h1>HELLO WORLD</h1>")
})

router.post('/api/register', register)
router.post('/api/login', login)
router.post('/api/refresh', refresh)

//notes
router.post('/api/notes',authMiddleware, createNote)
router.get('/api/notes', authMiddleware, getAllNotes)
router.put('/api/notes/:id', authMiddleware, updateNote)
router.delete('/api/notes/:id', authMiddleware, deleteNote)

router.get('/api/profile', authMiddleware, (req, res) => {
  res.json({
    message: "Profile berhasil diakses",
    user: req.user
  })
})

router.post("/api/logout", (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "lax",
    secure: false // true kalau HTTPS
  })
  res.sendStatus(204)
})

export default router