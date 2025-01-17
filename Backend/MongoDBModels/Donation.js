import mongoose from "mongoose";

// Define donation schema
const donationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  RequestStatus: {
    type: String,
    default: "Pending",
  },
  weight: {
    type: Number, // Updated field from quantity to weight
    required: true,
  },
  dimensions: {
    type: String, // New field for dimensions (e.g., "50x50x50 cm")
    required: true,
  },
  description: {
    type: String, // New field for a description of the donation
    required: true,
  },
  pickupInstructions: {
    type: String,
  },
  contactName: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  isCancelled: {
    type: Boolean,
    default: false, // Indicates whether the donation is cancelled
  },
  acceptedBy: {
    type: [mongoose.Schema.Types.ObjectId], // Array of NGO profile IDs
    ref: "UserProfile", // Reference to the UserProfile model
    default: [], // Initially empty
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastAcceptedBy: {
    type: mongoose.Schema.Types.ObjectId, // Points to the last NGO to accept
    ref: "UserProfile",
    default: null, // Initially null
  },
  userProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserProfile", // Reference to the UserProfile model
    required: true,
  },
});

// Create donation model
const Donation = mongoose.model("Donation", donationSchema);

export default Donation;
