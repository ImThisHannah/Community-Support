import express, { Request, Response } from 'express';
import { Document, Model, model, Schema } from 'mongoose';

const router = express.Router();

interface ILocation {
  type: 'Point';
  coordinates: [number, number];
}

interface IResource extends Document {
  name: string;
  description: string;
  type: string;
  location: ILocation;
  contactInfo: string;
}

const ResourceSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true },
  },
  contactInfo: { type: String, required: true },
});

const Resource: Model<IResource> = model<IResource>('Resource', ResourceSchema);

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
    res.status(201).json({ message: 'Resource registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
