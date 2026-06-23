// config/db.js
const dns = require('dns');
const mongoose = require('mongoose');

// Set DNS servers for Node's internal resolver to bypass local DNS resolution errors
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (err) {
  console.warn('⚠️ Warning: Failed to set custom DNS servers in db.js:', err.message);
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;