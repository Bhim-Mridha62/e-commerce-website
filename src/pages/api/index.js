import connectDB from '../../database/db';
// import express from 'express';
// import authRouter from './routes/Auth.js';
// Connect to MongoDB
// const app=express();
connectDB();
// app.use('/auth', authRouter);
// app.use('/api/auth',(req,res)=>{
//   res.status(200).json({message:'Welcome to the API'})
// })
// export default app;
export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'This is a GET request' });
  } else {
    res.status(405).json({ message: 'somthing wrong' });
  }
}
