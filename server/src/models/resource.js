const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
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
  contactInfo: {
    phone: String,
    email: String,
    website: String,
  },
});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;