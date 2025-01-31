import { Document, Model, Schema, model } from 'mongoose';

interface IResource {
  name: string;
  description: string;
  type: string; // 'food', 'shelter', 'medical', 'other'
  location: { 
    type: string; 
    coordinates: number[]; 
  };
  contactInfo: { 
    phone?: string; 
    email?: string; 
    website?: string; 
  };
}

interface IResourceDocument extends IResource, Document {
  location: {
    type: string;
    coordinates: number[];
  };
}

interface IResourceModel extends Model<IResourceDocument> {}

const ResourceSchema = new Schema<IResourceDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['food', 'shelter', 'medical', 'other'], required: true },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  },
  contactInfo: {
    phone: { type: String },
    email: { type: String },
    website: { type: String }
  }
});

const Resource = model<IResourceDocument, IResourceModel>('Resource', ResourceSchema);

export { Resource };
