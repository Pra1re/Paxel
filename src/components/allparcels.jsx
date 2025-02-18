import React, { useEffect, useState } from "react";
import Loading from "./loading";

const Allparcels = () => {
  const [parcels, setParcels] = useState([]);
  const [filteredParcels, setFilteredParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deliverymen, setDeliverymen] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [selectedDeliveryman, setSelectedDeliveryman] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    fetch("https://assignment-12-lovat.vercel.app/user")
      .then((res) => res.json())
      .then((data) => {
        setDeliverymen(data.filter((user) => user.role === "deliveryman"));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching deliverymen:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("https://assignment-12-lovat.vercel.app/myparcel")
      .then((res) => res.json())
      .then((data) => {
        setParcels(data);
        setFilteredParcels(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching parcels:", error);
        setLoading(false);
      });
  }, []);

  const handleParcel = (parcel) => {
    setSelectedParcel(parcel);
    setIsModalOpen(true);
  };

  const handleAssign = async () => {
    if (!selectedParcel || !selectedDeliveryman || !deliveryDate) {
      alert("Please select a deliveryman and a delivery date.");
      return;
    }

    try {
      const response = await fetch(`https://assignment-12-lovat.vercel.app/book/${selectedParcel._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deliveryMenId: selectedDeliveryman,
          deliveryDate,
        }),
      });

      if (response.ok) {
        alert("Parcel assigned successfully!");
        setIsModalOpen(false);
        setSelectedParcel(null);
        setDeliveryDate("");
        setSelectedDeliveryman("");
      } else {
        alert("Failed to assign parcel.");
      }
    } catch (error) {
      console.error("Error assigning parcel:", error);
    }
  };

  const handleFilter = () => {
    if (fromDate && toDate) {
      const filtered = parcels.filter((parcel) => {
        const parcelDate = new Date(parcel.deliveryDate);
        return (
          parcelDate >= new Date(fromDate) && parcelDate <= new Date(toDate)
        );
      });
      setFilteredParcels(filtered);
    } else {
      setFilteredParcels(parcels); // Reset to original data if no dates are selected
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">All Parcels</h1>
  
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-end ">
        <div className="flex flex-col">
          <label className="text-gray-700 dark:text-gray-300 font-semibold">From Date:</label>
          <input
            type="date"
            className="border rounded-lg p-2 bg-white dark:bg-gray-800 dark:text-white"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 dark:text-gray-300 font-semibold">To Date:</label>
          <input
            type="date"
            className="border rounded-lg p-2 bg-white dark:bg-gray-800 dark:text-white"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition self-end "
          onClick={handleFilter}
        >
          Filter
        </button>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredParcels.map((parcel) => (
          <div
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col justify-between"
            key={parcel._id}
          >
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">{parcel.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">📞 {parcel.phone}</p>
            <p className="text-gray-600 dark:text-gray-400">📅 Booking: {parcel.bookingdate}</p>
            <p className="text-gray-600 dark:text-gray-400">🚚 Expected: {parcel.deliveryDate}</p>
            <p className="text-gray-700 dark:text-gray-300 font-semibold">💰 ${parcel.price}</p>
            <p className="mt-2">
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  parcel.status === "Delivered"
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                }`}
              >
                {parcel.status}
              </span>
            </p>
            <button
              className="disabled:bg-gray-400 disabled:cursor-not-allowed mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              onClick={() => handleParcel(parcel)}
              disabled={parcel.status?.toString() !== "pending"}
            >
              Manage
            </button>
          </div>
        ))}
      </div>
  
      {isModalOpen && selectedParcel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Assign Deliveryman</h2>
            <label className="block my-3">
              <span className="text-gray-700 dark:text-gray-300">Select Deliveryman:</span>
              <select
                className="border rounded-lg p-2 w-full mt-1 bg-white dark:bg-gray-800 dark:text-white"
                value={selectedDeliveryman}
                onChange={(e) => setSelectedDeliveryman(e.target.value)}
              >
                <option value="">Select</option>
                {deliverymen.map((dm) => (
                  <option key={dm._id} value={dm._id}>
                    {dm._id}
                  </option>
                ))}
              </select>
            </label>
            <label className="block my-3">
              <span className="text-gray-700 dark:text-gray-300">Delivery Date:</span>
              <input
                className="border rounded-lg p-2 w-full mt-1 bg-white dark:bg-gray-800 dark:text-white"
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
            </label>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                onClick={handleAssign}
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default Allparcels;
