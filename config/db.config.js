import mongoose from 'mongoose';

export default async function connectDB() {
  if (!process.env.MONGO_URI) {
    console.warn('MONGO_URI missing, database connect nahi hua.');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DATABASE
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
}