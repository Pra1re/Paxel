import React, { useContext, useState } from 'react';
import { authcontext } from '../provider/authprovider';
import { Link, useNavigate } from 'react-router-dom';
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const { createuser, setuser,setrole,setroloading, updateUserProfile, googleLogin,setload } = useContext(authcontext);
  
  const [passwordError, setPasswordError] = useState("");
  const [role, setRole] = useState("user");

  const handleGoogleLogin = () => {
    
    googleLogin()
      .then(async (result) => {
        const user = result.user;
        setrole("user")
        setroloading(false)
        setuser(user);
        toast.success("Google login successful!");
        const userData = {
          name: user.displayName,
          email: user.email,
          number: "",
          role: "user",
          purl: user.photoURL || "", 
        };
  
        
        try {
          await fetch("https://assignment-12-lovat.vercel.app/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
          });
  
          navigate("/");
        } catch (error) {
          toast.error("Failed to save user data");
          console.error("Error:", error);
        }
      })
      .catch((error) => {
        toast.error("Google login failed!");
        console.error(error);
      });
  };
  

  const validatePassword = (password) => {
    const upperCasePattern = /[A-Z]/;
    const lowerCasePattern = /[a-z]/;
    const lengthPattern = /.{6,}/;

    if (!upperCasePattern.test(password)) {
      return "Password must contain at least one uppercase letter.";
    } else if (!lowerCasePattern.test(password)) {
      return "Password must contain at least one lowercase letter.";
    } else if (!lengthPattern.test(password)) {
      return "Password must be at least 6 characters long.";
    }
    return "";
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const name = form.get("fname") || "User";
    const number = form.get("number");
    const password = form.get("password");
    const role = form.get("role");
    //console.log("role in reg page = ",role);
   

    const passwordErrorMessage = validatePassword(password);
    if (passwordErrorMessage) {
      setPasswordError(passwordErrorMessage);
      return;
    } else {
      setPasswordError("");
    }

    try {
      const userCredential = await createuser(email, password);
      const user = userCredential.user;
      setrole(role)
      setroloading(false)
      setuser(user);

      toast.success("Successfully registered");

      await fetch("https://assignment-12-lovat.vercel.app/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, number, email, role }),
      });

setload(false)
      navigate("/");
    } catch (error) {
      toast.error("Registration failed");
      console.error("Error:", error);
    }
};

  return (
    <div className="hero min-h-screen bg-base-200 dark:bg-gray-800">
      <div className="hero-content flex flex-col lg:flex-row lg:justify-between lg:items-center w-full px-6 md:px-16">
        
        <div className="text-center lg:text-left lg:max-w-lg mb-10 lg:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold dark:text-white">Create Your Account</h1>
          <p className="py-6 text-gray-600 dark:text-gray-300">
            Join us today to start your journey. Sign up to access exclusive features and connect with like-minded people.
            Whether you're here to learn, grow, or explore, we have something for you!
          </p>
        </div>

        <div className="card w-full max-w-lg p-6 bg-base-100 shadow-lg rounded-lg dark:bg-gray-900">
          <form onSubmit={handlesubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text dark:text-gray-300">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="First name"
                  name="fname"
                  className="input input-bordered dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text dark:text-gray-300">Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Last name"
                  name="lname"
                  className="input input-bordered dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
            </div>
            <div className="form-control">
                <label className="label">
                  <span className="label-text dark:text-gray-300">Mobile number</span>
                </label>
                <input
                  type="number"
                  placeholder="Phone"
                  name="number"
                  className="input input-bordered dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
            

            <div className="form-control">
              <label className="label">
                <span className="label-text dark:text-gray-300">User Type</span>
              </label>
              <select
                name="role"
                className="select select-bordered dark:bg-gray-800 dark:text-white"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="user">User</option>
                <option value="deliveryman">Deliveryman</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text dark:text-gray-300">Photo URL</span>
              </label>
              <input
                type="text"
                placeholder="Photo URL"
                name="purl"
                className="input input-bordered dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text dark:text-gray-300">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="input input-bordered dark:bg-gray-800 dark:text-white"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text dark:text-gray-300">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="input input-bordered dark:bg-gray-800 dark:text-white"
                required
              />
              {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
            </div>

            <div className="form-control mt-6 space-y-4">
              <button className="btn btn-primary w-full">Sign up</button>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleGoogleLogin}
                  className="btn btn-outline flex items-center justify-center w-full sm:w-1/2 dark:text-white"
                >
                  Google
                </button>
                <Link
                  to="/login"
                  className="btn btn-outline flex items-center justify-center w-full sm:w-1/2 dark:text-white"
                >
                  Log in
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
