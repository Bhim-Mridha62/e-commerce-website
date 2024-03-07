import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/UserSchema'

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
          console.log(isMatch,"ismatch");
          if (!isMatch) {
            return res.status(401).json({ message: 'invalid Password' });
          }
          res.end();
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }  

}