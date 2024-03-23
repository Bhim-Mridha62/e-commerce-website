import { Product } from '@/Schemas/server/ProductSchema';

export default async function handler(req, res) {

  if (req.method === 'GET') {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: 'Invalid data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
