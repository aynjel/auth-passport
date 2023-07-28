const mongoose = require('mongoose');

async function connect(MONGO_URI) {
    try {
        await mongoose.connect(MONGO_URI)
            .then(() => console.log(`Successfully connected to MongoDB`))
            .catch(err => console.log(`MongoDB connection error: ${err}`));
    } catch (error) {
        console.log(`MongoDB connection error: ${error}, exiting...`);
    }
}

module.exports = connect;