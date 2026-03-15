import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      console.error('ERROR: MONGODB_URI environment variable is not defined!');
      console.error('Please set MONGODB_URI in your environment variables.');
      process.exit(1);
    }
    
    // Mask the password in logs for security
    const maskedUri = mongoUri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@');
    console.log(`Connecting to MongoDB... ${maskedUri.substring(0, 50)}...`);
    
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
