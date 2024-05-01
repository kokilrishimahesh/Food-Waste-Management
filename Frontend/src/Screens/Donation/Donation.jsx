import React, { useState } from 'react';
import './Donation.css';

const DonationScreen = () => {
  // Initialize state for donation form inputs
  const [donationData, setDonationData] = useState({
    type: '',
    quantity: 1,
    expirationDate: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    location: '',
    pickupInstructions: '',
  });

  // Handle input change for any form field
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonationData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle quantity change with increment or decrement
  const handleQuantityChange = (amount) => {
    const updatedQuantity = donationData.quantity + amount;
    if (updatedQuantity > 0) {
      setDonationData({ ...donationData, quantity: updatedQuantity });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the donation data
      const requestBody = {
        ...donationData,
      };

      // Send the donation data to the backend /donation route
      const response = await fetch('http://localhost:3000/donation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          userid: localStorage.getItem('Userid'),
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Donation submitted successfully:', data);
      } else {
        const errorData = await response.json();
        console.error('Donation submission failed:', errorData.message);
      }
    } catch (error) {
      console.error('Error submitting donation:', error);
    }
  };

  return (
    <div className="donation-screen">
      <h2 className="title">Create New Donation Listing</h2>
      <form onSubmit={handleSubmit}>
        {/* Donation Details */}
        <div className="row g-3">
          <div className="col-md-6">
            <label>Type of Donation:</label>
            <select
              className="form-select"
              name="type"
              value={donationData.type}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Fresh Produce">Fresh Produce</option>
              <option value="Canned Goods">Canned Goods</option>
              <option value="Cooked Food">Cooked Food</option>
              <option value="Raw Ingredients">Raw Ingredients</option>
            </select>
          </div>
          <div className="col-md-6">
            <label>Quantity:</label>
            <div className="input-group">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => handleQuantityChange(-1)}
              >
                -
              </button>
              <input
                type="number"
                className="form-control"
                name="quantity"
                disabled
                value={donationData.quantity}
                onChange={handleInputChange}
                required
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <label>Expiration Date (if applicable):</label>
            <input
              type="date"
              className="form-control"
              name="expirationDate"
              value={donationData.expirationDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6">
            <label>Contact Name:</label>
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
            <label>Contact Email:</label>
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
            <label>Contact Phone:</label>
            <input
              type="tel"
              className="form-control"
              name="contactPhone"
              value={donationData.contactPhone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-12">
            <label>Location:</label>
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
            <label>Pickup/Delivery Instructions:</label>
            <textarea
              className="form-control"
              name="pickupInstructions"
              value={donationData.pickupInstructions}
              onChange={handleInputChange}
              rows="4"
              required
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <div className="row g-3">
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary mt-4">Submit Donation</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DonationScreen;
