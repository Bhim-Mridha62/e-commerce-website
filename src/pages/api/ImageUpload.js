import axios from 'axios';
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const formData = new FormData();
    formData.append('file', req.body.file);

    try {
      const response = await axios.post('https://postimg.io/upload.php', formData);
      console.log(response,"from backend");
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).send('Error uploading image');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
