const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const studentRoutes  = require('./routes/studentRoutes');
const errorHandler   = require('./middlewares/errorHandler');
const AppError       = require('./utils/AppError');

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
// Must be registered BEFORE the error handler but AFTER all routes
app.use((req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
// Must be the LAST middleware — four params signals Express this is an error handler
app.use(errorHandler);

module.exports = app;
