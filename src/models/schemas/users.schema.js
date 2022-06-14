import mongoose from "mongoose";
const UsersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            "Invalid email",
        ],
    },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    timestamp: { type: Date, min: Date.now() }
})
const UserModel = mongoose.model('users', UsersSchema);

export default UserModel;