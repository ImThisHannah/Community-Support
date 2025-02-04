import mongoose, { Document, Schema } from 'mongoose';

interface IRequest extends Document {
  user: mongoose.Schema.Types.ObjectId;
  description: string;
  type: 'food' | 'shelter' | 'medical' | 'other';
  location: {
    type: string;
    coordinates: number[];
  };
  urgency: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
}

const requestSchema: Schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['food', 'shelter', 'medical', 'other'],
  },
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
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending',
  },
});

const Request = mongoose.model<IRequest>('Request', requestSchema);

export default Request;