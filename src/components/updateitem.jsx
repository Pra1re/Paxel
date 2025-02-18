import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

const Updateitem = () => {
    const { id }= useParams(); 
    const [parcel, setParcel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   
    useEffect(() => {
        const fetchParcel = async () => {
            try {
                const response = await fetch(`https://assignment-12-lovat.vercel.app/parcelget/${id}`);
                const data = await response.json();
                setParcel(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch parcel data.');
                setLoading(false);
            }
        };
        fetchParcel();
    }, [id]);

   
    const handleChange = (e) => {
        const { name, value } = e.target;
        setParcel((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://assignment-12-lovat.vercel.app/parcel/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(parcel),
            });
            const responseData = await response.json();
            //console.log("Response:", responseData);
    
                toast.success("Parcel updated successfully")
             
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };
    

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-4 space-y-6 mx-auto my-8 bg-white p-6 rounded-lg shadow-md dark:bg-gray-800"
        >
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ID (Read-Only)</label>
                <input
                    type="text"
                    name="_id"
                    value={parcel._id || ''}
                    readOnly
                    className="block w-full border border-gray-300 rounded-md p-2 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name (Read-Only)</label>
                <input
                    type="text"
                    name="name"
                    value={parcel.name || ''}
                    readOnly
                    className="block w-full border border-gray-300 rounded-md p-2 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email (Read-Only)</label>
                <input
                    type="email"
                    name="email"
                    value={parcel.email || ''}
                    readOnly
                    className="block w-full border border-gray-300 rounded-md p-2 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                <input
                    type="text"
                    name="phone"
                    value={parcel.phone || ''}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md p-2 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Parcel Type</label>
                <input
                    type="text"
                    name="parcelType"
                    value={parcel.parcelType || ''}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md p-2 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Parcel Weight</label>
                <input
                    type="number"
                    name="parcelWeight"
                    value={parcel.parcelWeight || ''}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md p-2 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Receiver Name</label>
                <input
                    type="text"
                    name="receiverName"
                    value={parcel.receiverName || ''}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md p-2 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Receiver Phone</label>
                <input
                    type="text"
                    name="receiverPhone"
                    value={parcel.receiverPhone || ''}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md p-2 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Delivery Address</label>
                <input
                    type="text"
                    name="deliveryAddress"
                    value={parcel.deliveryAddress || ''}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md p-2 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Delivery Date</label>
                <input
                    type="date"
                    name="deliveryDate"
                    value={parcel.deliveryDate || ''}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md p-2 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price</label>
                <input
                    type="number"
                    name="price"
                    value={parcel.price || ''}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md p-2 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                />
            </div>
            <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
                Update Parcel
            </button>
        </form>
    );
    
};

export default Updateitem;
