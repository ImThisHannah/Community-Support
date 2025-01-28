const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  skills: [{ type: String }],
  availability: [{ 
    day: String, 
    startTime: String, 
    endTime: String 
  }],
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
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

module.exports = Volunteer;
