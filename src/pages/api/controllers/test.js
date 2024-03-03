// pages/api/auth/logout.js
export default function handler(req, res) {
    if (req.method === 'GET') {
      // Perform logout logic
      res.json({ message: 'User logged out' });
    } else {
      res.status(405).end();
    }
  }
  