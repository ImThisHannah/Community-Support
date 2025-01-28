const express = require('express');
const router = express.Router();
const Resource = require('../models/resource.js');

// Register a new resource
router.post('/', async (req, res) => {
  try {
    const { name, description, type, location, contactInfo } = req.body;

    const resource = new Resource({
      name,
      description,
      type,
      location: {
        type: 'Point',
        coordinates: [location.longitude, location.latitude],
      },
      contactInfo,
    });

    await resource.save();
    res.status(201).json({ message: 'Resource registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });