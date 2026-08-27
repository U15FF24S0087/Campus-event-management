import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';
import connectDB from './src/config/db.js';
import { seedDefaultAdmin } from './src/config/seed.js';

const PORT = process.env.PORT || 5000;

connectDB()
  .then(async () => {
    await seedDefaultAdmin();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  });
