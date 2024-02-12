import { default as mongoose } from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
});

const authLogin = mongoose.models.users || mongoose.model('users', userSchema);
export default authLogin 