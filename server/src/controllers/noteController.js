import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import Note from "../models/noteModel.js"
import authMiddleware from "../middlewares/authMiddleware.js"
import {
    generateAccessToken, 
    generateRefreshToken
} from "../utils/generateToken.js"

const statusMessage = (status, message) => {
    res.status(status).json({message})
}

const register = async(req, res) => {
    const body = req.body
    if (!body) return statusMessage(400, "Tidak ada request!!!")

    const {email, password} = body
    if (!email || !password) return statusMessage(400, "Email dan Password harus diisi!!")

    const passwordHash = await bcrypt.hash(password, 12);

    const user = new User({
      email: email,
      password: passwordHash
    })

    user.save()
    res.json({ message: "User created" })
}

const login = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return statusMessage(400, "Email dan password wajib diisi")
        
        const user = await User.findOne({ email });
        if (!user) return statusMessage(401, "Email atau password salah")

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return statusMessage(401, "Email atau password salah")

        const accessToken = generateAccessToken({
            userId: user._id,
            email: user.email
        });

        const refreshToken = generateRefreshToken({
            userId: user._id
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({ accessToken });

    } catch (err) {
        next(err);
    }
}

const refresh = (req, res) => {
  const refreshToken = req.cookies.refreshToken
  if (!refreshToken) return res.sendStatus(401)

  try {
        const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
        )
    
        const newAccessToken = generateAccessToken({
        id: decoded.userId
        })

        res.json({ accessToken: newAccessToken })

    } catch {
    res.sendStatus(403)
    }
}

const createNote = async(req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({
        message: "title dan content wajib diisi"
        });
    }

    const note = await Note.create({
        title,
        content,
        userId: req.user.id   // 🔥 INI KUNCINYA
    });

    res.status(201).json(note);
}

const getAllNotes = async (req, res) => {
    const notes = await Note.find({
        userId: req.user.id 
    }).sort({ createdAt: -1 });

    res.json(notes);
}

export {register, login, refresh, createNote, getAllNotes}