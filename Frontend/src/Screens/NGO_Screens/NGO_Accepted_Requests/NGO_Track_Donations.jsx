import "./NGO_Track_Donations.css"
import React, { useState, useEffect } from 'react';
import axios from "axios";

const NGO_Track_Donations = () => {
    const [donations, setDonations] = useState([]);
    const [toggle, setToggle] = useState(false);

    const handleCancel = async (id) => {
        try {
            const response = await axios.post(`http://localhost:3000/ngo/donation/${id}/cancel`, { data: '1234' });

            if (response.status === 200) {
                setToggle(!toggle);
            }
        } catch (error) {
            console.log("error while cancelling donations", error);
        }
    }

    useEffect(() => {
        const fetchTrackDonations = async () => {
            try {
                const userId = localStorage.getItem('Userid');
                console.log(userId);

                if (!userId) {
                    console.error('User ID is not present in localStorage');
                    return; // Exit if userId is not available
                }

                const response = await axios.get(`http://localhost:3000/ngo/getAcceptedDonations/${userId}`);

                if (response.status === 200) {
                    const data = response.data;
                    console.log(data);

                    setDonations(data.donationlist);
                } else {
                    console.error('Failed to fetch donations');
                }
            } catch (error) {
                console.error('Error fetching donations:', error);
            }
        };

        fetchTrackDonations();

        const intervalId = setInterval(fetchTrackDonations, 15000); // Fetch every 15 seconds

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, [toggle]);

    return (
        <div className="track-donations-list-container">
            <h2 className="track-donations-heading">My Donations</h2>
            {donations && donations.length > 0 ? (
                donations.map((donation) => (
                    <div key={donation._id} className="donation-item">
                        <div className="donation-header">
                            <h3 className="donor-name">{donation.userProfile.fullName}</h3>
                            <div className="flex-container">
                                <p className={`donation-status ${donation.RequestStatus === 'Accepted' ? 'status-accepted' : 'status-pending'}`}>
                                    {donation.RequestStatus}
                                </p>
                                <p className="donation-status cancel-button" onClick={() => handleCancel(donation._id)}>
                                    Cancel
                                </p>
                            </div>
                        </div>
                        <div className="donation-details">
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="form-label">Type</label>
                                    <p className="form-value">{donation.type}</p>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Weight</label>
                                    <p className="form-value">{donation.weight} kg</p> {/* Updated from quantity to weight */}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="form-label">Dimensions</label>
                                    <p className="form-value">{donation.dimensions}</p> {/* New field for dimensions */}
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
                            <div className="row">
                                <div className="col-md-12">
                                    <label className="form-label">Description</label>
                                    <p className="form-value">{donation.description}</p> {/* New field for description */}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <label className="form-label">Cancelled</label>
                                    <p className="form-value">{donation.isCancelled ? 'Yes' : 'No'}</p> {/* Display cancellation status */}
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
