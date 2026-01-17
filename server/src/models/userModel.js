import mongoose from "mongoose";

await mongoose.connect(process.env.MONGODB_URI)

const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    createdAt: Date
})

const user = mongoose.model("user", userSchema)
