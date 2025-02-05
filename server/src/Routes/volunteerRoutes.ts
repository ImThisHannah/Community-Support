import express, { Request, Response } from 'express';
import { Document, Model, model, Schema } from 'mongoose';
// import auth from '../middleware/auth';

const router = express.Router();

interface ILocation {
  type: 'Point';
  coordinates: [number, number];
}

interface IVolunteer extends Document {
  user: string;
  skills: string;
  availability: string;
  location: ILocation;
}

const VolunteerSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  skills: { type: String, required: true },
  availability: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true },
  },
});

const Volunteer: Model<IVolunteer> = model<IVolunteer>('Volunteer', VolunteerSchema);

// Register as a volunteer
// router.post('/', auth, async (req: Request, res: Response) => {
router.post('/', async (req: Request, res: Response) => {
  try {
    const { skills, availability, location } = req.body;

    const volunteer = new Volunteer({
      user: req.user._id,
      skills,
      availability,
      location: {
        type: 'Point',
        coordinates: [location.longitude, location.latitude],
      },
    });

    await volunteer.save();
    res.status(201).json({ message: 'Volunteer registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update volunteer profile
// router.put('/', auth, async (req: Request, res: Response) => {
router.put('/', async (req: Request, res: Response) => {
  try {
    const { skills, availability, location } = req.body;

    const volunteer = await Volunteer.findOne({ user: req.user._id });
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    volunteer.skills = skills;
    volunteer.availability = availability;
    volunteer.location = { type: 'Point', coordinates: [location.longitude, location.latitude] };

    return res.json(volunteer);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});