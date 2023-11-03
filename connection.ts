import mongoose from 'mongoose';

async function connectToDatabase() {
  let DB_URI = 'mongodb://localhost:27017/filmographyDB'
  if (process.env.DB_URI) DB_URI = process.env.DB_URI

  try {
    await mongoose.connect(DB_URI);
    console.log('Connected to the database');
  } catch (error) {
    console.error('There was an error:', error);
  }
}

connectToDatabase();