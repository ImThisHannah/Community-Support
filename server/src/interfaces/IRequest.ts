import { Document, Model, Schema } from 'mongoose'; 

interface IRequest {
  user: IUserDocument; 
  description: string;
  type: string; 
  location: { 
    type: string; 
    coordinates: number[]; 
  };
  urgency: string; 
  status: string; 
}

interface IRequestDocument extends Document, IRequest {}

interface IRequestModel extends Model<IRequestDocument> {}

const requestSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
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
      index: '2dsphere', 
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

const Request: IRequestModel = model('Request', requestSchema); 

module.exports = Request;