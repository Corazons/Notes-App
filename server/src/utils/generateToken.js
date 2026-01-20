import jwt from "jsonwebtoken"
import "dotenv/config";

function generateAccessToken(USER) {
  return jwt.sign(
    {
      userId: USER.id,
      email: USER.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15s" }
  )
}

function generateRefreshToken(USER) {
  return jwt.sign(
    {
      userId: USER.id,
      email: USER.email
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1h" }
  )
}

export {generateAccessToken, generateRefreshToken}