import mongoose from 'mongoose';


const Database_URL = 'mongodb+srv://runtimeTerror:u9LUu5WhKwiDY3xR@cluster0.ngoqydw.mongodb.net/food-waste-management';

mongoose.connect(Database_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
