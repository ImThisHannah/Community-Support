import mongoose, { Document, Schema } from 'mongoose';

interface IVolunteer extends Document {
  user: string;
  skills: string;
  availability: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
}

const volunteerSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  skills: { type: String, required: true },
  availability: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true },
  },
});

const Volunteer = mongoose.model<IVolunteer>('Volunteer', volunteerSchema);
export default Volunteer;
