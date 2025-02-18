import React, { useContext, useState } from "react";
import { authcontext } from "../provider/authprovider";
import { toast } from "react-toastify";

const Userprofile = () => {
  const { user } = useContext(authcontext);
  //console.log("user - ",user.displayName);
  const [name, setName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setPhotoURL(reader.result);
      };

      reader.readAsDataURL(file); 
    }
  };

  const handleUpdateProfile = () => {
    user.displayName = name;
    user.photoURL = photoURL;

    toast.success("Profile pic updated successfully")
    //console.log("Updated user:", user);
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-2xl font-semibold text-center mb-6 dark:text-white">User Profile</h1>
      <div className="dark:bg-gray-900 bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-center mb-6">
          <img
            src={photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="rounded-full w-32 h-32 object-cover border-4 border-gray-300"
          />
        </div>
        <div className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-gray-700  dark:text-white">
              Name
            </label>
            <input
              type="text"
              value={user.displayName || "User"}
              disabled
              
              className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
            />
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Email
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Profile Picture
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border px-3 py-2 rounded dark:text-white"
            />
          </div>

          
          <button
            onClick={handleUpdateProfile}
            className="btn btn-primary w-full mt-4"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
