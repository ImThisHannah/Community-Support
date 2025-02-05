import User from '../models/User';
import Request from '../models/Request';

export const resolvers = {
  Query: {
    getRequests: async () => {
      try {
        return await Request.find().populate('user');
      } catch (error) {
        throw new Error('Error fetching requests');
      }
    },
    getUserProfile: async (parent, { id }) => {
      try {
        return await User.findById(id);
      } catch (error) {
        throw new Error('User not found');
      }
    },
  },
  Mutation: {
    addRequest: async (parent, { description, type, coordinates, urgency, userId }) => {
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
    updateUserProfile: async (parent, { id, username, email }) => {
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
  },
};
