const mongoose = require('mongoose');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

// Database connection
mongoose.connect(process.env.DBPATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to database");
}).catch((error) => {
    console.log("Database connection error : " + error);
});

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

// Routes
const userRoutes = require('./routes/user-routes');
const projectRoutes = require('./routes/project-routes');
const ticketRoutes = require('./routes/ticket-routes');
const commentRoutes = require('./routes/comment-routes');

app.use('/api/account', userRoutes);
app.use('/api/app/projects', projectRoutes);
app.use('/api/app/tickets', ticketRoutes);
app.use('/api/app/comments', commentRoutes);

// Starting server
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`App running at port ${port}`);
});