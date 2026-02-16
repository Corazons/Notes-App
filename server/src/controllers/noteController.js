import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import Note from "../models/noteModel.js"
import {
    generateAccessToken, 
    generateRefreshToken
} from "../utils/generateToken.js"

const statusMessage = (res, status, message) => {
    res.status(status).json({message})
}

const register = async(req, res) => {
    const body = req.body
    if (!body) return res.status(400).json({ message: "Tidak ada request!!!"})

    const {email, password} = body
    if (!email || !password) return res.status(400).json({ message: "Email dan Password harus diisi!!"})

    const passwordHash = await bcrypt.hash(password, 12)

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
        if (!email || !password) return res.status(400).json({messsage: "Email dan Password harus diisi!!"})
        
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({message: "Email atau password salah"})

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({message: "Email atau password salah"})

        const accessToken = generateAccessToken({
            userId: user._id,
            email: user.email
        });

        const refreshToken = generateRefreshToken({
            userId: user._id,
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
            userId: decoded.userId,
            email: decoded.email
        });

        res.json({ accessToken: newAccessToken })

    } catch {
    res.sendStatus(403)
    }
}

const getMe = async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(403).json({message: "User tidak ditemukan"})
        
        res.json(user);
    } catch {
        res.status(500).json("Gagal ambil user")
    }
}

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body

    if (!title || !content) {
      return res.status(400).json({message: "Title & content harus ditambahkan"})
    }

    const note = await Note.create({
      title,
      content,
      userId: req.user.id,
      createdAt: new Date()
    });

    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: "Gagal membuat note"})
  }
};

const getAllNotes = async (req, res) => {
    const notes = await Note.find({
        userId: req.user.id 
    }).sort({ createdAt: -1 });

    res.json(notes);
}

const updateNote = async (req, res) =>{
    try{
        const body = req.body;
        if(!body) return res.status(400).json({message: "Title & content harus ditambahkan"})
        
        const noteId = req.params.id;
        if(!body) return res.status(400).json({message: "TIdak ada noteId"})
            
        const note = await Note.findByIdAndUpdate(noteId, body, { new: true });
        
        res.json(note);
        res.status(200).json({message: "Note berhasil diubah"})
    }catch(err){
        res.status(500).json({message: "Gagal mengubah note"})
    }
}

const deleteNote = async (req, res) =>{
    const note = await Note.findByIdAndDelete(req.params.id)
    res.json(note);
}

export {register, login, refresh, getMe, createNote, getAllNotes, updateNote, deleteNote}