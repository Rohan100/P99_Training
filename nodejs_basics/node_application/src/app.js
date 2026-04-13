const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const studentRoutes = require('./routes/studentRoutes');

const app = express();

// ─── Global Middleware ────────────────────────────────────────────────────────
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ─── Serve Static Frontend ────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, '..', 'public')));

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/students', studentRoutes);

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

module.exports = app;
