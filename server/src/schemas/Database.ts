import mongoose, { Document, Model, model, Schema } from 'mongoose';

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect('your_mongodb_connection_string', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;

// Volunteer Schema and Model
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

export { Volunteer };

// Function to create a volunteer
const createVolunteer = async () => {
  const volunteer = new Volunteer({
    user: 'some_user_id',
    skills: 'First Aid, CPR',
    availability: 'Weekends',
    location: {
      type: 'Point',
      coordinates: [-122.4194, 37.7749], // Example coordinates
    },
  });

  await volunteer.save();
  console.log('Volunteer registered successfully');
};

// Connect to the database and create a volunteer
const run = async () => {
  await connectDB();
  await createVolunteer();
};

run();
