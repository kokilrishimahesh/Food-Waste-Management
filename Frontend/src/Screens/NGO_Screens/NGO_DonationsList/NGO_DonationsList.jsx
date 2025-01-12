import React, { useState, useEffect } from 'react';
import './NGO_DonationsList.css';

const NGO_DonationsList = () => {
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const response = await fetch('http://localhost:3000/ngo/donationList');

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

        const intervalId = setInterval(fetchDonations, 15000); // Fetch every 15 seconds

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);

    const handleAccept = async (donationId) => {
        try {
            const response = await fetch(`http://localhost:3000/ngo/donation/${donationId}/accept`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setDonations((prevDonations) =>
                    prevDonations.map((donation) =>
                        donation._id === donationId
                            ? { ...donation, RequestStatus: 'Accepted' }
                            : donation
                    )
                );
            } else {
                console.error('Failed to accept donation');
            }
        } catch (error) {
            console.error('Error accepting donation:', error);
        }
    };

    return (
        <>
            <div class="donations-list-container">
                <h2 class="donations-heading">Donations</h2>
                {donations.map((donation) => (
                    <div key={donation._id} className="donation-item">
                        <div className="donation-header">
                            <h3 className="donor-name">{donation.userProfile.fullName}</h3>
                            <p className="donation-status {donation.RequestStatus === 'Accepted' ? 'status-accepted' : 'status-pending'}">
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
                        <div className="donation-actions">
                            <button
                                className="btn btn-primary"
                                onClick={() => handleAccept(donation._id)}
                                disabled={donation.RequestStatus === 'Accepted'}
                            >
                                {donation.RequestStatus === 'Accepted' ? 'Accepted' : 'Accept'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
};

export default NGO_DonationsList;
