import User from "../models/UserSchema";

export default async function handler(req,res){
    const  {email} = req.body;
    try {
        console.log(email,"email");
        const user=await User.findOneAndDelete({email})
        if (!user) {
            res.status(400).json({message:'email not exit'})
        } else {
           await user.remove();
           return res.status(200).json({ message: 'User deleted successfully' });
        }   
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });

    }

} 