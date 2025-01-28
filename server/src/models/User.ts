const { model } = require('mongoose'); 
const { IUser, IUserDocument, IUserModel } = require('../interfaces/User.ts');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'volunteer', 'resourceProvider', 'admin'],
    default: 'user',
  },
});

userSchema.statics.register = async (userData: IUser): Promise<IUserDocument> => { 
  try {
    const { email, password } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists'); 
    }

    const hashedPassword = await bcrypt.hash(password, 10); 

    const newUser = new User({ 
      email, 
      password: hashedPassword, 
    });

    await newUser.save();

    return newUser; 

  } catch (error) {
    console.error(error);
    throw error;
  }
};

userSchema.statics.login = async (email: string, password: string): Promise<IUserDocument | null> => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return null; 
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return null; 
    }

    return user;

  } catch (error) {
    console.error(error);
    throw error; 
  }
};

const User: IUserModel = model<IUserDocument, IUserModel>('User', userSchema); 

module.exports = User;





