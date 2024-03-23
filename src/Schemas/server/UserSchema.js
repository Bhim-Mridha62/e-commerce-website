import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    otp :{
        type: Number,
        required :false
    },
    otpVerify :{
        type: Boolean,
        required :false
    },
    SecretToken:{
        type:String,
        required:false
    }
});
// const User = mongoose.model("User", UserSchema);
export default mongoose.models.User || mongoose.model('User', UserSchema)
// export default User;
