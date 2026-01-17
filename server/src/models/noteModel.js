import mongoose from "mongoose";

await mongoose.connect(process.env.MONGODB_URI)

const noteSchema = mongoose.Schema({
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

const note = mongoose.model("note", noteSchema)
