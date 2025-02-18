import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiUser, FiPackage, FiShoppingBag } from "react-icons/fi";
import { authcontext } from "../provider/authprovider";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { role } = useContext(authcontext);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 text-white bg-gray-900 p-2 rounded-full focus:outline-none z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <div
        className={`fixed inset-y-0 left-0 w-64 h-full bg-gray-900 text-white p-5 space-y-6 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-64"} md:relative md:translate-x-0 min-h-screen z-40`}
      >
        <h2 className="text-2xl font-semibold text-center">Dashboard</h2>

        <nav className="mt-6 space-y-4">
          {role == "user" ? (
            <div>
              <Link to="/dashboard/profile" className="flex items-center gap-2 p-3 hover:bg-gray-700 rounded">
                <FiUser />
                My Profile
              </Link>

              <Link to="/dashboard/book" className="flex items-center gap-2 p-3 hover:bg-gray-700 rounded">
                <FiPackage />
                Book a Parcel
              </Link>

              <Link to="/dashboard/myparcel" className="flex items-center gap-2 p-3 hover:bg-gray-700 rounded">
                <FiShoppingBag />
                My Parcels
              </Link>
            </div>
          ) : role == "admin" ? (
            <div>
              <Link to="/dashboard/statistics" className="flex items-center gap-2 p-3 hover:bg-gray-700 rounded">
                <FiUser />
                Statistics
              </Link>

              <Link to="/dashboard/allparcel" className="flex items-center gap-2 p-3 hover:bg-gray-700 rounded">
                <FiPackage />
                All parcels
              </Link>

              <Link to="/dashboard/alluser" className="flex items-center gap-2 p-3 hover:bg-gray-700 rounded">
                <FiShoppingBag />
                All users
              </Link>
              <Link to="/dashboard/alldeliveryman" className="flex items-center gap-2 p-3 hover:bg-gray-700 rounded">
                <FiShoppingBag />
                All deliveryman
              </Link>
            </div>
          ) : role == "deliveryman" ? (
            <div>
              <Link to="/dashboard/deliverylist" className="flex items-center gap-2 p-3 hover:bg-gray-700 rounded">
                <FiUser />
                Delivery List
              </Link>

              <Link to="/dashboard/myreview" className="flex items-center gap-2 p-3 hover:bg-gray-700 rounded">
                <FiPackage />
                My reviews
              </Link>
            </div>
          ) : null}
        </nav>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
