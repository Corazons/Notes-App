import jwt from "jsonwebtoken"
import "dotenv/config";

function generateAccessToken(USER) {
  return jwt.sign(
    {
      userId: USER.userId,
      email: USER.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10m" }
  );
}

function generateRefreshToken(USER) {
  return jwt.sign(
    {
      userId: USER.userId,
      email: USER.email
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1h" }
  )
}

export {generateAccessToken, generateRefreshToken}