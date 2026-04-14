const express = require('express');
const path = require('path');

const portRoutes = require('./routes/portRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use((req, res, next) => {
    console.log("api call to the sever " + req.url + " " + req.method)
    next()
})

app.use('/api/ports', portRoutes);

app.use((req, res) => {
    res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

module.exports = app;
