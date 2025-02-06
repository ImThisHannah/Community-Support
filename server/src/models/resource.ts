import mongoose, { Document, Schema } from 'mongoose';

interface IResource extends Document {
  name: string;
  description?: string;
  type: 'food' | 'shelter' | 'medical' | 'other';
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  contactInfo: {
    phone?: string;
    email?: string;
    website?: string;
  };
}

const resourceSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: String,
  type: {
    type: String,
    enum: ['food', 'shelter', 'medical', 'other'],
  },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere' },
  },
  contactInfo: {
    phone: String,
    email: String,
    website: String,
  },
});

const Resource = mongoose.model<IResource>('Resource', resourceSchema);
export default Resource;
