import React, { useState, useEffect } from "react";

const NGO_DonationsList = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch("http://localhost:3000/ngo/donationList");

        if (response.ok) {
          const data = await response.json();
          // Only include pending and cancelled donations
          const filteredDonations = data.donations.filter(
            (donation) => donation.RequestStatus === "Pending" || donation.isCancelled
          );
          setDonations(filteredDonations);
        } else {
          console.error("Failed to fetch donations");
        }
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    fetchDonations();

    const intervalId = setInterval(fetchDonations, 15000); // Fetch every 15 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const handleAccept = async (donationId) => {
    try {
      const userId = localStorage.getItem("Userid");

      if (!userId) {
        console.error("User ID is not present in localStorage");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/ngo/donation/${donationId}/accept`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ngoId: userId }),
        }
      );

      if (response.ok) {
        setDonations((prevDonations) =>
          prevDonations.map((donation) =>
            donation._id === donationId
              ? { ...donation, RequestStatus: "Accepted" }
              : donation
          )
        );
      } else {
        console.error("Failed to accept donation");
      }
    } catch (error) {
      console.error("Error accepting donation:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-6 text-center py-4">Donations</h1>

      {/* Donations Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse text-center">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Quantity</th>
              <th className="py-3 px-4">Dimensions</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Contact Name</th>
              <th className="py-3 px-4">Contact Phone</th>
              <th className="py-3 px-4">Contact Email</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Pickup Instructions</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.length > 0 ? (
              donations.map((donation) => (
                <tr
                  key={donation._id}
                  className="hover:bg-gray-100 border-b text-gray-600"
                >
                  <td className="py-3 px-4">{donation.type}</td>
                  <td className="py-3 px-4">{donation.weight}</td>
                  <td className="py-3 px-4">{donation.dimensions}</td>
                  <td className="py-3 px-4">{donation.location}</td>
                  <td className="py-3 px-4">{donation.contactName}</td>
                  <td className="py-3 px-4">{donation.contactPhone}</td>
                  <td className="py-3 px-4">{donation.contactEmail}</td>
                  <td className="py-3 px-4 text-left break-words whitespace-normal">
                    {donation.description}
                  </td>
                  <td className="py-3 px-4 text-left break-words whitespace-normal">
                    {donation.pickupInstructions}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      className={`px-4 py-2 rounded ${
                        donation.RequestStatus === "Accepted"
                          ? "bg-green-500 text-white cursor-not-allowed"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                      onClick={() => handleAccept(donation._id)}
                      disabled={donation.RequestStatus === "Accepted"}
                    >
                      {donation.RequestStatus === "Accepted"
                        ? "Accepted"
                        : "Accept"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="py-6 text-center text-gray-500 text-sm"
                >
                  No pending or cancelled donations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NGO_DonationsList;
