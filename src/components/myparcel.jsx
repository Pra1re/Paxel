import React, { useContext, useEffect, useState } from "react";
import { authcontext } from "../provider/authprovider";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const MyParcel = () => {
  const { user } = useContext(authcontext);
  const [users, setUsers] = useState([]);
  const [selectedDeliveryMan, setSelectedDeliveryMan] = useState(null);

  const [parcels, setParcels] = useState([]);
  const [x, setX] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [reviewData, setReviewData] = useState({
    userName: "",
    userImage: "",
    rating: 5,
    feedback: "",
    deliveryMenId: "",
  });

  useEffect(() => {
    fetch("https://assignment-12-lovat.vercel.app/myparcel")
      .then((res) => res.json())
      .then((data) => setX(data))
      .catch((err) => console.error("Error fetching parcels:", err));
  }, []);

  useEffect(() => {
    setParcels(x.filter((p) => p.email === user.email));
  }, [x, user]);

  useEffect(() => {
    fetch("https://assignment-12-lovat.vercel.app/user")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  
  const filteredParcels =
    selectedStatus === "all"
      ? parcels
      : parcels.filter((parcel) => parcel.status === selectedStatus);

  
  const openReviewModal = (parcel) => {
    const dman = users.find((u) => u._id === parcel.deliveryMenId);

    if (!dman) {
      console.error("Delivery man not found");
      return;
    }

    setSelectedDeliveryMan(dman);

    setReviewData({
      userName: dman.name || "User",
      date: new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      userImage: "N/A",
      rating: 5,
      feedback: "",
      deliveryMenId: parcel.deliveryMenId,
    });

    setShowModal(true);
  };

 
  const handleSubmitReview = async () => {
    if (!selectedDeliveryMan) {
      console.error("No delivery man selected");
      return;
    }

    try {
      
      const response1 = await fetch(
        `https://assignment-12-lovat.vercel.app/singleusereview/${selectedDeliveryMan._id}`
      );
      const deliveryManData = await response1.json();

      
      const prevRating = deliveryManData.rating || 0;
      const prevReviewCount = deliveryManData.totalReviews || 0;
      const newReviewCount = prevReviewCount + 1;
      const newAvgRating =
        (prevRating * prevReviewCount + reviewData.rating) / newReviewCount;

      
      const response2 = await fetch("https://assignment-12-lovat.vercel.app/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      
      const response3 = await fetch(
        `https://assignment-12-lovat.vercel.app/usereview/${selectedDeliveryMan._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            rating: newAvgRating,
            totalReviews: newReviewCount,
          }),
        }
      );

      if (response2.ok) {
        toast.success("review successfully added")
        setShowModal(false);
      } else {
        alert("Failed to submit review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const updateParcelStatus = async (parcelId, status) => {
    const result = await Swal.fire({
      title: `Are you sure you want to mark this parcel as ${status}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(
        `https://assignment-12-lovat.vercel.app/updateParcel/${parcelId}`,
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
        Swal.fire({
          title: `Parcel marked as ${status} successfully!`,
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Failed to update parcel status.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error updating parcel status:", error);
      Swal.fire({
        title: "Error occurred while updating the parcel.",
        icon: "error",
      });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 dark:text-white">My Parcels</h2>

      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
          Filter by Status
        </label>
        <select
          className="w-full border px-3 py-2 rounded dark:text-white dark:bg-gray-800"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="on the way">On the Way</option>
          <option value="Delivered">Delivered</option>
          <option value="returned">Returned</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

     
      <div className="space-y-4">
        {filteredParcels.map((parcel, index) => (
          <div
            key={index}
            className="bg-white p-4 shadow-md rounded-lg border border-gray-200 dark:bg-gray-800 dark:text-white"
          >
            <h3 className="text-lg font-semibold mb-1">{parcel.parcelType}</h3>
            <p className="text-gray-700 dark:text-white">
              <strong>Requested Date:</strong> {parcel.deliveryDate}
            </p>
            <p className="text-gray-700 dark:text-white">
              <strong>Approx. Delivery:</strong>{" "}
              {parcel.deliveryDate || "Not Set"}
            </p>
            <p className="text-gray-700 dark:text-white">
              <strong>Booking Date:</strong>{" "}
              {new Date().toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-1 dark:text-white">
              <strong>Delivery Men ID:</strong>{" "}
              {parcel.deliveryMenId || "Not Assigned"}
            </p>
            <p className="text-gray-700 mb-1 dark:text-white">
              <strong>Status:</strong>
              <span
                className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${
                  parcel.status === "pending"
                    ? "bg-yellow-300 text-yellow-800"
                    : parcel.status === "on the way"
                    ? "bg-blue-300 text-blue-800"
                    : parcel.status === "Delivered"
                    ? "bg-green-300 text-green-800"
                    : parcel.status === "returned"
                    ? "bg-orange-300 text-orange-800"
                    : "bg-red-300 text-red-800"
                }`}
              >
                {parcel.status}
              </span>
            </p>

            {parcel.status === "Delivered" ? (
              <button
                className="mt-3 btn btn-sm text-white bg-green-500 rounded-md hover:bg-green-600 transition-all"
                onClick={() => openReviewModal(parcel)}
              >
                Review
              </button>
            ) : (
              <div>
                <button
                  className="btn btn-sm btn-primary mr-2 mt-2 w-[70px]"
                  onClick={() => updateParcelStatus(parcel._id, "Cancelled")}
                  disabled={parcel.status !== "pending"}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-sm btn-primary mr-2 mt-2 w-[70px]"
                  disabled={parcel.status !== "pending"}
                >
                  <Link to={`updateitem/${parcel._id}`}>Update</Link>
                </button>
                <button
                  className="btn btn-sm btn-primary mr-2 mt-2 w-[70px]"
                  disabled={parcel.status != "pending"}
                >
                  Pay
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Submit Your Review
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  User Name
                </label>
                <input
                  className="w-full border px-3 py-2 rounded"
                  type="text"
                  value={reviewData.userName}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rating
                </label>
                <select
                  className="w-full border px-3 py-2 rounded"
                  value={reviewData.rating}
                  onChange={(e) =>
                    setReviewData({ ...reviewData, rating: +e.target.value })
                  }
                >
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Feedback
                </label>
                <textarea
                  className="w-full border px-3 py-2 rounded"
                  value={reviewData.feedback}
                  onChange={(e) =>
                    setReviewData({ ...reviewData, feedback: e.target.value })
                  }
                  placeholder="Write your feedback here"
                />
              </div>
              <div className="flex justify-center space-x-3 mt-4">
                <button
                  className="btn btn-success"
                  onClick={handleSubmitReview}
                >
                  Submit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyParcel;
