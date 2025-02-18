import React, { useContext, useEffect, useState } from "react";
import { authcontext } from "../provider/authprovider";
import Loading from "./loading";
import { toast } from "react-toastify";

const Deliverytask = () => {
  const { user } = useContext(authcontext);
  const [load, setLoad] = useState(true);
  const [userId, setUserId] = useState(null);
  const [parcels, setParcels] = useState([]);

  useEffect(() => {
    fetch("https://assignment-12-lovat.vercel.app/user")
      .then((res) => res.json())
      .then((data) => {
        const foundUser = data.find((d) => d.email === user.email);
        if (foundUser) {
          setUserId(foundUser._id);
        }
      })
      .catch((error) => console.error("Error fetching user data:", error))
      .finally(() => setLoad(false));
  }, [user.email]);

  useEffect(() => {
    if (!userId) return;

    fetch("https://assignment-12-lovat.vercel.app/myparcel")
      .then((res) => res.json())
      .then((data) => {
        const filteredParcels = data.filter((d) => d.deliveryMenId === userId);
        setParcels(filteredParcels);
      })
      .catch((error) => console.error("Error fetching parcels:", error));
  }, [userId]);

  const updateParcelStatus = async (parcelId, status) => {
    if (
      !window.confirm(`Are you sure you want to mark this parcel as ${status}?`)
    )
      return;

    try {
      //console.log("Sending request for parcelId:", parcelId);

      const response = await fetch(
        `https://assignment-12-lovat.vercel.app/updateParcel/${parcelId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );
      const response2 = await fetch(
        `https://assignment-12-lovat.vercel.app/user/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      if (response.ok) {
        setParcels(
          parcels.map((p) => (p._id === parcelId ? { ...p, status } : p))
        );
        toast.success("Parcel delivered successfully")
      } else {
        alert("Failed to update parcel status.");
      }
    } catch (error) {
      console.error("Error updating parcel status:", error);
    }
  };

  if (load) {
    return <Loading />;
  }

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Delivery Tasks
      </h2>
      {parcels.length > 0 ? (
        parcels.map((parcel) => (
          <div
            key={parcel._id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4"
          >
            <p className="text-gray-800 dark:text-gray-200">
              <strong>Booked User:</strong> {parcel.name} ({parcel.email})
            </p>
            <p className="text-gray-800 dark:text-gray-200">
              <strong>Phone:</strong> {parcel.phone}
            </p>
            <p className="text-gray-800 dark:text-gray-200">
              <strong>Receiver:</strong> {parcel.receiverName}
            </p>
            <p className="text-gray-800 dark:text-gray-200">
              <strong>Receiver Phone:</strong> {parcel.receiverPhone}
            </p>
            <p className="text-gray-800 dark:text-gray-200">
              <strong>Address:</strong> {parcel.deliveryAddress}
            </p>
            <p className="text-gray-800 dark:text-gray-200">
              <strong>Requested Delivery:</strong> {parcel.deliveryDate}
            </p>
            <p className="text-gray-800 dark:text-gray-200">
              <strong>Approximate Delivery:</strong> {parcel.deliveryDate}
            </p>
            <p className="text-gray-800 dark:text-gray-200">
              <strong>Status:</strong>{" "}
              <span className="font-bold text-blue-500 dark:text-blue-400">
                {parcel.status}
              </span>
            </p>
            <div className="mt-3 flex gap-3">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md disabled:bg-gray-400 dark:disabled:bg-gray-600"
                onClick={() => updateParcelStatus(parcel._id, "Delivered")}
                disabled={
                  parcel.status === "Delivered" || parcel.status === "Cancelled"
                }
              >
                Deliver
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md disabled:bg-gray-400 dark:disabled:bg-gray-600"
                onClick={() => updateParcelStatus(parcel._id, "Cancelled")}
                disabled={
                  parcel.status === "Delivered" || parcel.status === "Cancelled"
                }
              >
                Cancel
              </button>
              <a
                href={`https://www.google.com/maps?q=${parcel.latitude},${parcel.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                View Location
              </a>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-800 dark:text-gray-200">No parcels assigned.</p>
      )}
    </div>
  );
  
};

export default Deliverytask;
