import { default as mongoose } from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 20
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fathername: {
        type: String,
        required: true,
    },
    jobtitle: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true }
);

const UserData = mongoose.models.users || mongoose.model('users', userSchema);


export default UserData; 