const express = require('express');
const bodyParser = require('body-parser');
const schoolRoutes = require('./router/schoolRoutes.js');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Cors
app.use(cors());

// Routes
app.use('/api', schoolRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
