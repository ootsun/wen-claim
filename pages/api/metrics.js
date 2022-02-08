import dbConnect from '../../lib/dbConnect';
import Metric from '../../models/Metric.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await dbConnect();
      const metric = await Metric.create(req.body);
      res.status(201).json({ success: true, data: metric });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}
