const express = require('express');
const cors = require('cors');
const pool = require('./config/db'); 
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Test Neon Postgres Connection
pool.connect()
  .then(() => console.log('[Task Force 404] Neon PostgreSQL Connected Successfully'))
  .catch(err => console.error('[Task Force 404] Neon Database connection failed:', err.stack));

// Mount Routes
app.use('/api/auth', require('./routes/auth'));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Project Vyuha API Live' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[Task Force 404] Backend running on port ${PORT}`);
});