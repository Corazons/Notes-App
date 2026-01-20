import mongoose from "mongoose";

await mongoose.connect(process.env.MONGODB_URI)

const noteSchema = mongoose.Schema({
    title: String,
    content: String,

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Note", noteSchema)
