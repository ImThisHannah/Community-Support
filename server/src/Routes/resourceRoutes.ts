import express, { Request, Response } from 'express';
import Resource from '../models/resource';

const router = express.Router();

// Get all resources
router.get('/', async (_req: Request, res: Response) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Add a new resource
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, type, location, contactInfo } = req.body;

    const resource = new Resource({
      name,
      description,
      type,
      location: {
        type: 'Point',
        coordinates: [location.longitude, location.latitude],
      },
      contactInfo,
    });

    await resource.save();
    res.status(201).json({ message: 'Resource registered successfully', resource });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
