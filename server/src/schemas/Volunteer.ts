import mongoose, { Schema, Document } from 'mongoose';

interface IVolunteer extends Document {
  name: string;
  email: string;
  phone: string;
}

const VolunteerSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

const Volunteer = mongoose.model<IVolunteer>('Volunteer', VolunteerSchema);

export default Volunteer;