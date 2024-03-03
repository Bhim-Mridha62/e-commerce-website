export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req.body); // Logs the JSON received
    res.status(200).json({ message: 'This is a GET request' });
  } else {
    res.status(405).end();
  }
}