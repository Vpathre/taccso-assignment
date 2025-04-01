const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

// Run only once to update users
async function updateUserLocations() {
  try {
    await mongoose.connect('mongodb://localhost:27017/LibreChat');
    console.log('Connected to MongoDB');

    const result = await User.updateMany(
      { location: { $exists: false } },
      { $set: { location: 'us' } },
    );

    console.log(`Updated ${result.modifiedCount} users`);
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error updating user locations:', error);
  }
}

updateUserLocations();