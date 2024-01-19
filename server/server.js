require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');

const {MONGO_URL, PORT = 8080} = process.env;

if (!MONGO_URL) {
    console.error("Missing MONGO_URL environment variable");
    process.exit(1); //exit the current program
}

const app = express();
app.use(express.json());


async function startServer() {
    try {
        console.log('Connecting to the database...');
        await mongoose.connect(MONGO_URL);
        console.log('Database connection established!');

        app.use('/api/users', userRoutes);
        app.user('/api/users/:id', todoRoutes);

        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

startServer().catch(error => {
    console.error("Error starting server:", error);
    process.exit(1);
});
