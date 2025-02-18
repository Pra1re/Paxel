import React, { useContext, useEffect, useState } from "react";
import { authcontext } from "../provider/authprovider";
import { toast } from "react-toastify";

const Alluser = () => {
  const { user } = useContext(authcontext);
  const [parcels, setParcels] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    fetch("https://assignment-12-lovat.vercel.app/user")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("https://assignment-12-lovat.vercel.app/myparcel")
      .then((res) => res.json())
      .then((data) => {
        setParcels(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching parcels:", error);
        setLoading(false);
      });
  }, []);

  const updateRole = async (singleUser, newRole) => {
    try {
      const response = await fetch(`https://assignment-12-lovat.vercel.app/finduser/${singleUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (response.ok) {
        setUsers(
          users.map((u) =>
            u._id === singleUser._id ? { ...u, role: newRole } : u
          )
        );
        toast.success("role assigned successfully")
      } else {
        toast.error("This user is already of this role")
      }
    } catch (error) {
      console.error(`Error assigning ${newRole} role:`, error);
    }
  };

  const getBookedParcels = (email) =>
    parcels.filter((parcel) => parcel.email === email).length;

  const getTotalSpent = (email) => {
    const total = parcels
      .filter((parcel) => parcel.email === email)
      .reduce((sum, parcel) => sum + (parcel.price || 0), 0);
    return Number(total) || 0; 
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading users...</p>;
  }

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        All Registered Users
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg text-sm md:text-base">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-2 md:px-4 py-2 text-left">Name</th>
              <th className="px-2 md:px-4 py-2 text-left">Phone Number</th>
              <th className="px-2 md:px-4 py-2 text-left">Parcels Booked</th>
              <th className="px-2 md:px-4 py-2 text-left">Total Spent</th>
              <th className="px-2 md:px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((singleUser, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0
                    ? "bg-gray-50 dark:bg-gray-700"
                    : "bg-gray-100 dark:bg-gray-800"
                } hover:bg-blue-50 dark:hover:bg-blue-600 transition`}
              >
                <td className="px-2 md:px-4 py-3 text-gray-800 dark:text-white font-medium">
                  {singleUser.name || "N/A"}
                </td>
                <td className="px-2 md:px-4 py-3 text-gray-600 dark:text-gray-300">
                  {singleUser.number || "N/A"}
                </td>
                <td className="px-2 md:px-4 py-3 text-gray-800 dark:text-white font-semibold">
                  {getBookedParcels(singleUser.email)}
                </td>
                <td className="px-2 md:px-4 py-3 text-gray-800 dark:text-white">
                  ${getTotalSpent(singleUser.email).toFixed(2)}
                </td>
                <td className="px-2 md:px-4 py-3">
                  {user?.email !== singleUser.email ? (
                    <div className="flex flex-wrap gap-2">
                      <button
                        className="px-2 md:px-3 py-1 text-xs md:text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                        onClick={() => updateRole(singleUser, "deliveryman")}
                      >
                        Make Deliveryman
                      </button>
                      <button
                        className="px-2 md:px-3 py-1 text-xs md:text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600"
                        onClick={() => updateRole(singleUser, "admin")}
                      >
                        Make Admin
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      Current user role cannot be changed
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      <div className="flex justify-center mt-6 flex-wrap gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-2 md:px-3 py-1 text-xs md:text-sm font-medium rounded ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
  
  
};

export default Alluser;
