import React, { useState, useEffect } from 'react';
import './DonationList.css';

const DonationsList = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch('http://localhost:3000/donationHistory', {
          headers: {
            userid: localStorage.getItem('Userid'), // Include user id from local storage in headers
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDonations(data.donations);
        } else {
          console.error('Failed to fetch donations');
        }
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };

    fetchDonations();
  }, []); // Empty dependency array to run once on component mount

  return (
    <div className="donations-list-container">
      <h2 className="donations-heading">Donations</h2>
        {donations.map((donation) => (
          <div key={donation._id} className="donation-item row">

            <div class="col-md-6">
              <label for="inputEmail4" class="form-label">Type</label>
              <p className='form-control'>{donation.type}</p>
            </div>
            <div class="col-md-6">
              <label for="inputPassword4" class="form-label">Expiration Date</label>
              <p className='form-control'>{donation.expirationDate}</p>
            </div>
            <div class="col-4">
              <label for="inputAddress" class="form-label">Quantity</label>
              <p className='form-control'>{donation.quantity}</p>
            </div>
            <div class="col-md-4">
              <label for="inputCity" class="form-label">Status</label>
              <p className='form-control'>{donation.RequestStatus}</p>
            </div>
            <div class="col-md-4">
              <label for="inputZip" class="form-label">Location</label>
              <p className='form-control'>{donation.location}</p>
            </div>
          </div>

        ))}

    </div >
  );
};

export default DonationsList;
