import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
});

const SendOtpToPhNumber = mongoose.model('SendOtpToPhNumber', userSchema);
export default SendOtpToPhNumber;
