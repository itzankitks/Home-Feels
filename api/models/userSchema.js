import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username: {
        unique: true,
        type: String,
        required: true
    },
    email: {
        unique: true,
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export default mongoose.model("User", UserSchema)