
import mongoose from "mongoose"
// Define schema for user profile
const userProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User collection
    required: true
  },
  role : {
    type : String,
    required :true
  },
  fullName: {
    type: String,
    required: true
  },
  donations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donation' // Reference to the Donation collection
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);
export default UserProfile;
