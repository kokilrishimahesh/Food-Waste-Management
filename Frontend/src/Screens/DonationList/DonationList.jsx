import React, { useState, useEffect } from 'react';

const DonationsList = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [filter, setFilter] = useState('All');
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isDetailsVisible, setDetailsVisible] = useState(false);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch('http://localhost:3000/donationHistory', {
          headers: {
            userid: localStorage.getItem('Userid'),
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.donations);
          
          setDonations(data.donations);
          setFilteredDonations(data.donations);
        } else {
          console.error('Failed to fetch donations');
        }
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };

    fetchDonations();
  }, []);

  useEffect(() => {
    if (filter === 'All') {
      setFilteredDonations(donations);
    } else {
      setFilteredDonations(
        donations.filter((donation) =>
          filter === 'Cancelled'
            ? donation.isCancelled
            : donation.RequestStatus === filter
        )
      );
    }
  }, [filter, donations]);

  const handleShowDetails = (donation) => {
    setSelectedDonation(donation);
    setDetailsVisible(true);
  };

  const handleCloseDetails = () => {
    setDetailsVisible(false);
    setSelectedDonation(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Donations History</h2>

      {/* Filter Section */}
      <div className="flex items-center gap-4 mb-6">
        <label htmlFor="filter" className="text-gray-700 font-medium">
          Filter by Status:
        </label>
        <select
          id="filter"
          className="border rounded-md px-4 py-2 bg-white"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Donation List */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse text-center">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Quantity</th>
              <th className="py-3 px-4">Dimensions</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Contact Name</th>
              <th className="py-3 px-4">Accepted By</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonations.length > 0 ? (
              filteredDonations.map((donation) => (
                <tr
                  key={donation._id}
                  className="hover:bg-gray-100 border-b text-gray-600"
                >
                  <td className="py-3 px-4">{donation.type}</td>
                  <td className="py-3 px-4">{donation.weight}</td>
                  <td className="py-3 px-4">{donation.dimensions}</td>
                  <td className="py-3 px-4">
                    {donation.isCancelled ? 'Cancelled' : donation.RequestStatus}
                  </td>
                  <td className="py-3 px-4">{donation.contactName}</td>
                  <td className="py-3 px-4">{donation.lastAcceptedBy || "-"}</td>
                  <td className="py-3 px-4">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleShowDetails(donation)}
                    >
                      Show Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="py-6 text-center text-gray-500 text-sm"
                >
                  No donations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Details Pane */}
      {isDetailsVisible && selectedDonation && (
        <div className="absolute w-[20rem] top-0 right-0 inset-0 bg-gray-900 bg-opacity-50">
          <div className=" bg-white shadow-lg h-full overflow-y-auto transform transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h3 className="text-lg font-bold text-gray-800">
                Donation Details
              </h3>
              <button
                className="text-gray-600 hover:text-gray-900"
                onClick={handleCloseDetails}
              >
                ×
              </button>
            </div>
            <div className="px-6 py-4">
              <p className="text-sm">
                <strong>Type:</strong> {selectedDonation.type}
              </p>
              <p className="text-sm mt-2">
                <strong>Weight:</strong> {selectedDonation.weight}
              </p>
              <p className="text-sm mt-2">
                <strong>Dimensions:</strong> {selectedDonation.dimensions}
              </p>
              <p className="text-sm mt-2">
                <strong>Status:</strong>{' '}
                {selectedDonation.isCancelled
                  ? 'Cancelled'
                  : selectedDonation.RequestStatus}
              </p>
              <p className="text-sm mt-2">
                <strong>Location:</strong> {selectedDonation.location}
              </p>
              <p className="text-sm mt-2">
                <strong>Contact Name:</strong> {selectedDonation.contactName}
              </p>
              <p className="text-sm mt-2">
                <strong>Contact Email:</strong> {selectedDonation.contactEmail}
              </p>
              <p className="text-sm mt-2">
                <strong>Contact Phone:</strong> {selectedDonation.contactPhone}
              </p>
              <p className="text-sm mt-2">
                <strong>Description:</strong> {selectedDonation.description}
              </p>
              <p className="text-sm mt-2">
                <strong>Pickup Instructions:</strong>{' '}
                {selectedDonation.pickupInstructions}
              </p>
              {!selectedDonation.isCancelled &&
                selectedDonation.acceptedBy?.length > 0 && (
                  <p className="text-sm mt-2">
                    <strong>Accepted By:</strong>{' '}
                    {selectedDonation.acceptedBy
                      .map((ngo) => ngo.fullName)
                      .join(', ')}
                  </p>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationsList;
