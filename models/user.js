import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true }
);

//If we already have the model, it will return the User, if not it will create new model with the userSchema we created above.
const User = models.User || mongoose.model("User", userSchema);
export default User;