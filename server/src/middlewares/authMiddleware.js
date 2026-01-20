import "dotenv/config";
import jwt from "jsonwebtoken"
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization
    console.log(authHeader)
    if (!authHeader) {
        return res.status(401).json({ message: "Token tidak ada" })
    }

    const token = authHeader.split(" ")[1];
    console.log(token.split(".").length);
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        console.error("JWT ERROR:", err.message);
        return res.status(401).json({ message: err.message })
    }
}

export default authMiddleware