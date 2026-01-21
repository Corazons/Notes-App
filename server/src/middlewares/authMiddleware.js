import "dotenv/config";
import jwt from "jsonwebtoken"

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: "Token tidak ada" })
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = {
            id: decoded.userId,
            email: decoded.email
        };
        next()
    } catch (err) {
        console.error("JWT ERROR:", err.message);
        return res.status(401).json({ message: err.message })
    }
}

export default authMiddleware