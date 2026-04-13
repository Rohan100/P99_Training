require('dotenv').config();
const app = require('./src/app');
const pool = require('./src/config/db');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Test DB connection before starting
    await pool.query('SELECT 1');
    console.log('✅ Database connection verified');

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`📚 API Docs (base): http://localhost:${PORT}/api/students`);
      console.log(`🖥️  Frontend:        http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to the database:', err.message);
    process.exit(1);
  }
};

startServer();
