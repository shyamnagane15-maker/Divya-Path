const { Pool } = require('pg');
require('dotenv').config();

// Neon uses a single connection string provided via the DATABASE_URL environment variable
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true, // Required for Neon
  },
});

module.exports = pool;