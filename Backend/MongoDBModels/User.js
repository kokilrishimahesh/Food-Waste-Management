import mongoose from 'mongoose';

// Define user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true // Ensure emails are unique
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create user model
const User = mongoose.model('User', userSchema);

export default User;
