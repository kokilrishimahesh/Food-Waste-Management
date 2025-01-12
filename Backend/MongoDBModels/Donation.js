import mongoose from "mongoose";

// Define donation schema
const donationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  RequestStatus: {
    type: String,
    default: "Pending",
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
  isCancelled: {
    type: Boolean,
    default: false // Indicates whether the donation is cancelled
  },
  acceptedBy: {
    type: [mongoose.Schema.Types.ObjectId], // Array of NGO profile IDs
    ref: 'UserProfile', // Reference to the UserProfile model
    default: [] // Initially empty
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastAcceptedBy: {
    type: mongoose.Schema.Types.ObjectId, // Points to the last NGO to accept
    ref: 'UserProfile',
    default: null // Initially null
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
