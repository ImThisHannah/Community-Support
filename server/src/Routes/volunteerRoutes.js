const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');
const auth = require('../middleware/auth'); // Middleware for authentication

// Register as a volunteer
router.post('/', auth, async (req, res) => {
  try {
    const { skills, availability, location } = req.body;

    const volunteer = new Volunteer({
      user: req.user.id, // Use the user ID from the authenticated request
      skills,
      availability,
      location: {
        type: 'Point',
        coordinates: [location.longitude, location.latitude],
      },
    });

    await volunteer.save();
    res.status(201).json({ message: 'Volunteer registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update volunteer profile
router.put('/', auth, async (req, res) => {
  try {
    const { skills, availability, location } = req.body;

    const volunteer = await Volunteer.findOne({ user: req.user.id });
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    volunteer.skills = skills;
    volunteer.availability = availability;
    volunteer.location = {
      type: 'Point',
      coordinates: [location.longitude, location.latitude],
    };

    await volunteer.save();
    res.status(200).json({ message: 'Volunteer profile updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;