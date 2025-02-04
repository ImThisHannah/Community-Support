import mongoose, { Document, Schema } from 'mongoose';

interface IVolunteer extends Document {
  user: mongoose.Schema.Types.ObjectId;
  skills: string[];
  availability: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  location: {
    type: string;
    coordinates: number[];
  };
}

const volunteerSchema: Schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  skills: [{ type: String }],
  availability: [{ 
    day: String, 
    startTime: String, 
    endTime: String 
  }],
  location: {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      index: '2dsphere', // Create a geospatial index for location
    },
  },
});

const Volunteer = mongoose.model<IVolunteer>('Volunteer', volunteerSchema);

export default Volunteer;
