"use strict";

const express = require('express');
const swaggerDoc = require('./swaggerDoc');
const endopoints = require('./initializeEndpoints');

const app = express();
app.use(express.json());

endopoints(app);
swaggerDoc(app);

app.use((err, req, res, next) => res.status(500).json({"error": err.message}));

app.listen(3000, () => console.log(`Swagger That API listening on port 3000!`));

module.exports = app;