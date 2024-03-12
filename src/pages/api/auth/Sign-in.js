import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/UserSchema'
import CreateToken from '../utils/SecretToken';

export default async function handler(req, res){
    if (req.method !== 'POST') {
        return res.status(405).end();
      }
     const {email,password}=req.body; 
    try {
         const user=await User.findOne({email});
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          const isMatch=await bcrypt.compare(password,user.password);
          console.log(isMatch,"ismatch ashh");
          if (!isMatch) {
            return res.status(401).json({ message: 'invalid Password' });
          }
          const jwtToken=CreateToken(user._id)
          user.SecretToken=jwtToken;
           await user.save()
          res.status(200).json({ message: 'Sign sucessfully',Token: jwtToken});
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }  

}