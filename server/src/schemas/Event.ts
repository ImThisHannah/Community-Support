import mongoose, { Schema, Document } from 'mongoose';

interface IEvent extends Document {
  title: string;
  date: Date;
  location: string;
  description: string;
}

const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
});

const Event = mongoose.model<IEvent>('Event', EventSchema);

export default Event;