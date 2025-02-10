import User from '../models/User.js';
import Request from '../models/Request.js';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import { signToken, AuthenticationError } from '../utils/auth.js';

interface LoginUserArgs {
  email: string;
  password: string;
}

interface AddUserArgs {
  input:{
    username: string;
    email: string;
    password: string;
  }
}

export const resolvers = {
  Query: {
    getRequests: async () => {
      try {
        return await Request.find().populate('user');
      } catch (error) {
        throw new Error('Error fetching requests');
      }
    },
    getUserProfile: async (_parent: any, { id }: { id: string }) => {
      try {
        return await User.findById(id);
      } catch (error) {
        throw new Error('User not found');
      }
    },
  },
  Mutation: {
    addRequest: async (_parent: any, { description, type, coordinates, urgency, userId }: { description: string, type: string, coordinates: number[], urgency: string, userId: string }) => {
      try {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        const newRequest = new Request({
          description,
          type,
          location: { type: 'Point', coordinates },
          urgency,
          user: userId,
          status: 'pending'
        });

        await newRequest.save();
        return await newRequest.populate('user');
      } catch (error) {
        throw new Error('Error adding request');
      }
    },
    updateUserProfile: async (_parent: any, { id, username, email }: { id: string, username: string, email: string }) => {
      try {
        return await User.findByIdAndUpdate(
          id,
          { username, email },
          { new: true }
        );
      } catch (error) {
        throw new Error('Error updating profile');
      }
    },

    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      // Find a user with the provided email

      const user = await User.findOne({ email });
    
      // If no user is found, throw an AuthenticationError
      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);
    
      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },

    addUser: async (_parent: any, { input }: AddUserArgs) => {
      // Create a new user with the provided username, email, and password
      const user = await User.create({ ...input });
    
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },
  },
};

