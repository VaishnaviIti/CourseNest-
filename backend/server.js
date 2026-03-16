import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';

// Route files
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import enrollRoutes from './routes/enroll.js';
import paymentRoutes from './routes/payment.js';
import adminRoutes from './routes/admin.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  res.on('finish', () => {
    console.log(`${req.method} ${req.path} - ${res.statusCode}`);
  });
  next();
});

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'CourseNest API Server', 
    status: 'running',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enroll', enrollRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  console.log('Health check endpoint called');
  res.json({ 
    status: 'Server is running', 
    timestamp: new Date().toISOString(),
    node_version: process.version,
    platform: process.platform
  });
});

// Test database connection route
app.get('/api/test-db', async (req, res) => {
  try {
    const mongoose = await import('mongoose');
    const connection = mongoose.connection;
    const isConnected = connection && connection.readyState === 1;
    res.json({
      database: isConnected ? 'Connected' : 'Disconnected',
      uri_configured: !!process.env.MONGODB_URI,
      node_env: process.env.NODE_ENV || 'not-set'
    });
  } catch (error) {
    console.error('Test DB error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Manual seed endpoint (for production use)
app.get('/api/seed-database', async (req, res) => {
  try {
    console.log('Starting database seed...');
    // Run seed script directly without cd since we're already in backend folder on Render
    const { exec } = await import('child_process');
    const util = await import('util');
    const execPromise = util.promisify(exec);
    
    const result = await execPromise('npm run seed');
    console.log('Seed result:', result.stdout);
    
    res.json({ 
      message: 'Database seeded successfully!',
      output: result.stdout 
    });
  } catch (error) {
    console.error('Seed error:', error.message);
    res.status(500).json({ 
      error: 'Failed to seed database',
      details: error.message 
    });
  }
});

// Error handler
app.use(errorHandler);

// Global 404 handler
app.use((req, res) => {
  console.log(`404 Not Found: ${req.path}`);
  res.status(404).json({ 
    message: 'Route not found', 
    path: req.path 
  });
});

const PORT = process.env.PORT || 5000;

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  console.error(err.stack);
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`Environment: NODE_ENV=${process.env.NODE_ENV || 'not set'}`);
  console.log(`MongoDB URI configured: ${process.env.MONGODB_URI ? 'Yes' : 'No'}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});

export default app;
