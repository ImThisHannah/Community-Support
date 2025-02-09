import express, { Request, Response } from 'express';
import { Document, Model, model, Schema } from 'mongoose';

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
router.post('/', async (req: Request, res: Response) => {
  try {
    const { user, skills, availability, location } = req.body;

    const volunteer = new Volunteer({
      user: user || 'defaultUserId',
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
router.put('/', async (req: Request, res: Response) => {
  try {
    const { user, skills, availability, location } = req.body;

    const volunteer = await Volunteer.findOne({ user });
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    volunteer.skills = skills;
    volunteer.availability = availability;
    volunteer.location = { type: 'Point', coordinates: [location.longitude, location.latitude] };

    await volunteer.save();
    return res.json(volunteer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});

// Get all volunteers
router.get('/', async (_: Request, res: Response) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


export default router;
