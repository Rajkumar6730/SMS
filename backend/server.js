const dns = require('dns');

// Force Google DNS for SRV lookups
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');
    try {
      const User = require('./models/User');
      const count = await User.countDocuments();
      if (count === 0) {
        const admin = new User({
          username: 'admin',
          password: 'admin123',
          role: 'admin'
        });
        await admin.save();
        console.log('👤 Default admin user created (admin / admin123)');
      }
    } catch (err) {
      console.error('❌ Error seeding admin user:', err.message);
    }
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:');
    console.error(err);
  });

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});