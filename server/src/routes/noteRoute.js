import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config";
import authMiddleware from "../middlewares/authMiddleware.js"
import {generateAccessToken, generateRefreshToken} from "../utils/generateToken.js"
// import User from "../models/userModel"
// import Note from "../models/noteModel"

// >>
// async function checkCollections() {
//   await mongoose.connect(process.env.MONGODB_URI);

//   console.log("DB:", mongoose.connection.name);

//   const cols = await mongoose.connection.db.collections();
//   console.log("Collections:");
//   cols.forEach(c => console.log("-", c.collectionName));

//   await mongoose.disconnect();
// }

// checkCollections();
// <<

const USER = {
  id: "123",
  email: "user@gmail.com",
  password: bcrypt.hashSync("123456", 10)
}

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

// router.post('/register', async(req, res) => {
//     const body = req.body
//     const {email, password} = body
    
//     if (!email || !password) {
//       return res.status(400).json({
//         message: "Email dan Password harus diisi!!"
//       });
//     }

//     const passwordHash = await bcrypt.hash(password, 12);

//     const user = await User.Create({
//       email,
//       passwordHash
//     })

//     res.json({ message: "User created" });
// })

router.post('/login', async(req, res) => {
  const { email, password } = req.body
  const accessToken = generateAccessToken(USER);
  const refreshToken = generateRefreshToken(USER);

  if (email !== USER.email) {
    return res.status(401).json({ message: "Email salah" })
  }

  const isValid = await bcrypt.compare(password, USER.password)
  if (!isValid) {
    return res.status(401).json({ message: "Password salah" })
  }

  // BUAT JWT
  // const token = jwt.sign(
  //   {
  //     userId: USER.id,
  //     email: USER.email
  //   },
  //   process.env.JWT_SECRET,
  //   { expiresIn: "1h" }
  // );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",     
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
  })

  res.json({ accessToken })
})

router.post("/refresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken

  if (!refreshToken) return res.sendStatus(401)

  try {
      const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

      const newAccessToken = generateAccessToken({
      id: decoded.userId
    })

    res.json({ accessToken: newAccessToken })
  } catch {
    res.sendStatus(403)
  }
})

router.get("/profile", authMiddleware, (req, res) => {
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