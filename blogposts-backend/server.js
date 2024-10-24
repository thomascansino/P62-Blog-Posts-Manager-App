const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection.js');
const port = process.env.PORT || 5000;

connectDb();

app.use(cors({
    origin: '*', // allow requests from frontend server
    credentials: true, // allows cookies or auth headers to be sent along with requests
}));

app.use(express.json());

app.use('/api/users', require('./routes/userRoutes'));

app.use('/api/posts', require('./routes/blogRoutes'));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
