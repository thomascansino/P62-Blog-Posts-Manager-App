const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection.js');
const port = process.env.PORT || 5000;

connectDb();

app.use(cors());

app.use(express.json());

app.use('/api/users', require('./routes/userRoutes'));

app.use('/api/posts', require('./routes/blogRoutes'));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
