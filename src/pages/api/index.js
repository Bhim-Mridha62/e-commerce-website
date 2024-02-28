import multer from 'multer';

import path from 'path';
// import connectDB from './database/db';

// Connect to MongoDB
// connectDB();

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
console.log(storage,"fghj");
const upload = multer({ storage: storage }).single('image');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    upload(req, res, async function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error uploading image 1' });
      }
      try {
        const { filename, path } = req.file;
        // Save image metadata to MongoDB here
        res.status(201).json({ success: true, message: 'Image uploaded successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error uploading image' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
