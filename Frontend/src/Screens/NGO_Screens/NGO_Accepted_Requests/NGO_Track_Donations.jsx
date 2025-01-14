import "./NGO_Track_Donations.css"
import React, { useState, useEffect } from 'react';
import axios from "axios";

const NGO_Track_Donations = () => {
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        const fetchTrackDonations = async () => {
            try {
                // Retrieve userId from localStorage
                const userId = localStorage.getItem('Userid');

                if (!userId) {
                    console.error('User ID is not present in localStorage');
                    return; // Exit if userId is not available
                }

                const response = await axios.get(`http://localhost:3000/ngo/getAcceptedDonations/${userId}`);

                if (response.ok) {
                    const data = await response.data();
                    setDonations(data.donations);
                } else {
                    console.error('Failed to fetch donations');
                }
            } catch (error) {
                console.error('Error fetching donations:');
            }
        };

        fetchTrackDonations();

        const intervalId = setInterval(fetchTrackDonations, 15000); // Fetch every 15 seconds

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);

    return (
        <div className="track-donations-list-container">
            <h2 className="track-donations-heading">My Donations</h2>
            {donations.length > 0 ? (
                donations.map((donation) => (
                    <div key={donation._id} className="donation-item">
                        <div className="donation-header">
                            <h3 className="donor-name">{donation.userProfile.fullName}</h3>
                            <p
                                className={`donation-status ${
                                    donation.RequestStatus === 'Accepted' ? 'status-accepted' : 'status-pending'
                                }`}
                            >
                                {donation.RequestStatus}
                            </p>
                        </div>
                        <div className="donation-details">
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="form-label">Type</label>
                                    <p className="form-value">{donation.type}</p>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Quantity</label>
                                    <p className="form-value">{donation.quantity}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="form-label">Expiration Date</label>
                                    <p className="form-value">{donation.expirationDate}</p>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Location</label>
                                    <p className="form-value">{donation.location}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="form-label">Contact Name</label>
                                    <p className="form-value">{donation.contactName}</p>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Contact Phone</label>
                                    <p className="form-value">{donation.contactPhone}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <label className="form-label">Contact Email</label>
                                    <p className="form-value">{donation.contactEmail}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <label className="form-label">Pickup Instructions</label>
                                    <p className="form-value">{donation.pickupInstructions}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No donations to track yet!</p>
            )}
        </div>
    );
};

export default NGO_Track_Donations;
