import React, { useState } from 'react';
import './Donation.css';
import { useNavigate } from 'react-router-dom';

const DonationScreen = () => {

  const navigate = useNavigate();

  const initialState = {
    type: '',
    weight: 1, // Renamed from quantity to weight
    dimensions: '',
    description: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    location: '',
    pickupInstructions: '',
  };

  const [donationData, setDonationData] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonationData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleWeightChange = (amount) => {
    const updatedWeight = parseFloat(donationData.weight) + amount;
    if (updatedWeight > 0) {
      setDonationData((prevState) => ({
        ...prevState,
        weight: updatedWeight.toFixed(2), // Ensures two decimal places
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/donation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          userid: localStorage.getItem('Userid'),
        },
        body: JSON.stringify(donationData), // Send updated donationData object
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log('Donation submitted successfully:', data);
        setDonationData(initialState);
      } else {
        const errorData = await response.json();
        console.error('Donation submission failed:', errorData.message);
      }

      navigate("/user/donationlist")

    } catch (error) {
      console.error('Error submitting donation:', error);
    }
  };

  return (
    <div className="h-screen bg-light py-5 w-full">
      <div className="container">
        <div className="card shadow-lg p-4">
          <h2 className="text-center text-primary mb-4">Create New Donation Listing</h2>
          <form onSubmit={handleSubmit}>
            {/* Section 1: Donation Details */}
            <div className="mb-4">
              <h4 className="text-secondary mb-3">Donation Details</h4>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Type of Donation:</label>
                  <select
                    className="form-select"
                    name="type"
                    value={donationData.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Food">Furniture</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Raw Ingredients">Raw Ingredients</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Quantity</label>
                  <div className="input-group">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => handleWeightChange(-0.5)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="form-control text-center"
                      name="weight"
                      value={donationData.weight}
                      onChange={(e) =>
                        setDonationData((prevState) => ({
                          ...prevState,
                          weight: parseFloat(e.target.value) || '', // Ensures valid weight
                        }))
                      }
                      required
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => handleWeightChange(0.5)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Dimensions:</label>
                  <select
                    className="form-select mb-2"
                    name="dimensions"
                    value={donationData.dimensions}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Dimensions</option>
                    <option value="Small (10x10x10 cm)">Small (10x10x10 cm)</option>
                    <option value="Medium (50x50x50 cm)">Medium (50x50x50 cm)</option>
                    <option value="Large (100x100x100 cm)">Large (100x100x100 cm)</option>
                  </select>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Custom Dimensions (e.g., 200x150x100 cm)"
                    name="dimensions"
                    value={donationData.dimensions}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Description of Donation:</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={donationData.description}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Brief description of the donation..."
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Section 2: Contact Information */}
            <div className="mb-4">
              <h4 className="text-secondary mb-3">Contact Information</h4>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Contact Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="contactName"
                    value={donationData.contactName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Contact Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    name="contactEmail"
                    value={donationData.contactEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Contact Phone:</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="contactPhone"
                    value={donationData.contactPhone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Location & Instructions */}
            <div className="mb-4">
              <h4 className="text-secondary mb-3">Location & Pickup Instructions</h4>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label">Location:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    value={donationData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Pickup/Delivery Instructions:</label>
                  <textarea
                    className="form-control"
                    name="pickupInstructions"
                    value={donationData.pickupInstructions}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Any specific delivery or pickup instructions..."
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button type="submit" className="btn btn-primary px-5 py-2">
                Submit Donation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonationScreen;
