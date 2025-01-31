import { Schema, model, Document, Model } from 'mongoose';

interface IUser {
  email: string;
  password?: string; 
  role: string; 
}

interface IUserDocument extends IUser, Document {}

interface IUserModel extends Model<IUserDocument> {
  register(userData: IUser): Promise<IUserDocument>;
  login(email: string, password: string): Promise<IUserDocument | null>;
}

const UserSchema = new Schema<IUserDocument>({
  email: { type: String, required: true },
  password: { type: String, required: false },
  role: { type: String, required: true },
});

UserSchema.statics.register = async function(userData: IUser) {
  const user = new this(userData);
  await user.save();
  return user;
};

UserSchema.statics.login = async function(email: string, password: string) {
  const user = await this.findOne({ email });
  if (user && user.password === password) {
    return user;
  }
  return null;
};

const User = model<IUserDocument, IUserModel>('User', UserSchema);

export { User };
