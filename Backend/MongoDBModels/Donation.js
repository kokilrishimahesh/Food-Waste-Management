import mongoose from "mongoose";
// Define donation schema
const donationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  RequestStatus : {
    type : String,
    default : "Pending",
  },
  quantity: {
    type: Number, // Changed type to Number for quantity
    required: true
  },
  expirationDate: {
    type: Date
  },
  pickupInstructions: {
    type: String
  },
  contactName: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  },
  contactPhone: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  userProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserProfile', // Reference to the UserProfile model
    required: true
  }
});

// Create donation model
const Donation = mongoose.model('Donation', donationSchema);

export default Donation;
