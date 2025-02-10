import User from '../models/User.js';
import Request from '../models/Request.js';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const { User } = require('../models');

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
    addUser: async (_parent: any, { username, email, password }: { username: string, email: string, password: string }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      return {
        token,
        user,
      };
    },
  },
};

module.exports = resolvers;
