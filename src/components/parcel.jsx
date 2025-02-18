import React, { useState, useEffect, useContext } from 'react';
import { authcontext } from '../provider/authprovider';
import { toast } from 'react-toastify';

const ParcelBooking = () => {
  const { user } = useContext(authcontext);
  //console.log("user is = ",user);
  const [formData, setFormData] = useState({
    name: user.displayName || 'User',
    email: user.email,
    phone: '',
    parcelType: '',
    parcelWeight: '',
    receiverName: '',
    receiverPhone: '',
    deliveryAddress: '',
    deliveryDate: '',
    latitude: '',
    longitude: '',
    price: 0,
    bookingdate:new Date().toLocaleDateString(),
    status: 'pending',
  });

  useEffect(() => {
    calculatePrice(formData.parcelWeight);
  }, [formData.parcelWeight]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculatePrice = (weight) => {
    let price = weight === '1' ? 50 : weight === '2' ? 100 : weight > 2 ? 150 : 0;
    setFormData((prev) => ({ ...prev, price }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://assignment-12-lovat.vercel.app/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      toast.success("parcel booked successfully")
    } catch (err) {
      console.error('Error booking parcel:', err);
    }
  };

  return (
    <div className="w-[90%]  mx-auto p-6 bg-white dark:bg-gray-900 shadow-md rounded-lg my-8">
      <h2 className="text-2xl font-semibold text-center mb-4 dark:text-white">Book Your Parcel</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium dark:text-white">Name</label>
          <input type="text" name="name" value={formData.name} readOnly className="w-[100%]  dark:text-white px-1 py-2 rounded-sm dark:bg-slate-600" />
        </div>

        <div>
          <label className="block font-medium dark:text-white">Email</label>
          <input type="email" name="email" value={formData.email} readOnly className="w-[100%] dark:text-white px-1 py-2 rounded-sm dark:bg-slate-600" />
        </div>

        <div>
          <label className="block font-medium dark:text-white">Phone Number</label>
          <input type="text" name="phone" placeholder="Enter phone number" onChange={handleChange} required className="w-[100%] dark:text-white px-1 py-2 rounded-sm dark:bg-slate-600" />
        </div>

        <div>
          <label className="block font-medium dark:text-white">Parcel Type</label>
          <input type="text" name="parcelType" placeholder="Enter parcel type" onChange={handleChange} required className="w-[100%] dark:text-white px-1 py-2 rounded-sm dark:bg-slate-600" />
        </div>

        <div>
          <label className="block font-medium dark:text-white">Parcel Weight (kg)</label>
          <input type="number" name="parcelWeight" placeholder="Enter weight" value={formData.parcelWeight} onChange={handleChange} required className="w-[100%] dark:text-white px-1 py-2 rounded-sm dark:bg-slate-600" />
        </div>

        <div>
          <label className="block font-medium  dark:text-white">Receiver's Name</label>
          <input type="text" name="receiverName" placeholder="Enter receiver's name" onChange={handleChange} required className="w-[100%] dark:text-white px-1 py-2 rounded-sm dark:bg-slate-600" />
        </div>

        <div>
          <label className="block font-medium dark:text-white">Receiver's Phone</label>
          <input type="text" name="receiverPhone" placeholder="Enter receiver's phone" onChange={handleChange} required className="w-[100%] dark:text-white px-1 py-2 rounded-sm dark:bg-slate-600" />
        </div>

        <div>
          <label className="block font-medium dark:text-white">Delivery Address</label>
          <input type="text" name="deliveryAddress" placeholder="Enter delivery address" onChange={handleChange} required className="w-[100%] dark:text-white px-1 py-2 rounded-sm dark:bg-slate-600" />
        </div>

        <div>
          <label className="block font-medium dark:text-white">Requested Delivery Date</label>
          <input type="date" name="deliveryDate" onChange={handleChange} required className="w-[100%] dark:text-white px-1 py-2 rounded-sm dark:bg-slate-600" />
        </div>

        <div>
          <label className="block font-medium dark:text-white">Latitude</label>
          <input type="text" name="latitude" placeholder="Enter latitude" onChange={handleChange} required className="w-[100%] dark:text-white px-1 py-2 rounded-sm dark:bg-slate-600" />
        </div>

        <div>
          <label className="block font-medium dark:text-white">Longitude</label>
          <input type="text" name="longitude" placeholder="Enter longitude" onChange={handleChange} required className="w-[100%] dark:text-white px-1 py-2 rounded-sm dark:bg-slate-600" />
        </div>

        <div>
          <label className="block font-medium dark:text-white">Price</label>
          <input type="text" name="price" value={formData.price} readOnly className="w-[100%] dark:text-white px-1 py-2 rounded-sm dark:bg-slate-600" />
        </div>

        <button type="submit" className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition">
          Book Parcel
        </button>
      </form>
    </div>
  );
};

export default ParcelBooking;
