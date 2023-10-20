import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const userProfileSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        roles: {
            type: String,
            default: "user",
        },
    },
    { timestamps: true }
);

//Encrypting the password
userProfileSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await  bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password, salt);
    next();
});

userProfileSchema.methods.isPasswordMatched = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password) ;
}


const UserProf = mongoose.model("UserProf", userProfileSchema);

export default UserProf;
