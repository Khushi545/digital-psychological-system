require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Route files
const auth = require('./routes/auth');
const screening = require('./routes/screening');
const chat = require('./routes/chat');
const appointments = require('./routes/appointments');
const mood = require('./routes/mood');
const journal = require('./routes/journal');
const forum = require('./routes/forum');
const admin = require('./routes/admin');

// Mount routers
app.use('/api/auth', auth);
app.use('/api/screening', screening);
app.use('/api/chat', chat);
app.use('/api/appointments', appointments);
app.use('/api/mood', mood);
app.use('/api/journal', journal);
app.use('/api/forum', forum);
app.use('/api/admin', admin);

app.get('/', (req, res) => res.json({ message: 'Mental Health App API Running' }));

const PORT = process.env.PORT || 5000;

// Connect to DB and start server
const startServer = async () => {
  try {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    
    await mongoose.connect(uri);
    console.log('MongoDB Memory Server Connected successfully');
    
    app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};

startServer();
