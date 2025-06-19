import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
       required: false,
    },
    verifyOtp: {
        type: String,
        default: ''
    },
    isAccountVerified: {
        type: Boolean,
        default: false
    },
    verifyOtpExpireAt: {
        type: Number,
        default: 0
    },
    resetOtp: {
        type: String,
        default: ''
    },
    resetOtpExpireAt: {
        type: Number,
        default: 0
    },
     googleId: { type: String },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const userModel = mongoose.models.user || mongoose.model('user', userSchema);
export default userModel;