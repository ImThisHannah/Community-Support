import { Document, Model, Schema, model } from 'mongoose';

interface IUser {
  email: string;
  password?: string;
  role: string; 
}

interface IUserDocument extends IUser, Document {}

interface IVolunteer {
  user: IUserDocument;
  skills: string[];
  availability: { day: string, startTime: string, endTime: string }[];
  location: {
    type: { type: String, enum: ['Point'], required: true };
    coordinates: [number, number];
  };
}

interface IVolunteerDocument extends IVolunteer, Document {}

interface IVolunteerModel extends Model<IVolunteerDocument> {
  findByUserId(userId: string): Promise<IVolunteerDocument | null>;
}

const VolunteerSchema = new Schema<IVolunteerDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  skills: { type: [String], required: true },
  availability: [
    {
      day: { type: String, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true }
    }
  ],
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  }
});

VolunteerSchema.statics.findByUserId = function(userId: string) {
  return this.findOne({ user: userId });
};

const Volunteer = model<IVolunteerDocument, IVolunteerModel>('Volunteer', VolunteerSchema);

export { Volunteer };
