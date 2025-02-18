import React, { useContext, useEffect, useState } from 'react';
import { authcontext } from '../provider/authprovider';
import Loading from './loading';

const Myreview = () => {
  const [reviews, setreviews] = useState([]);
  const { user } = useContext(authcontext);
  const [users, setusers] = useState([]);
  const [load, setload] = useState(true);

  useEffect(() => {
    fetch("https://assignment-12-lovat.vercel.app/user")
      .then((res) => res.json())
      .then((data) => {
        setusers(data);
        setload(false);
      });
  }, []);

  useEffect(() => {
    fetch("https://assignment-12-lovat.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => {
        setreviews(data);
        setload(false);
      });
  }, []);

  if (load) {
    return <Loading></Loading>;
  }

  const me = users.find((u) => u.email === user.email);
  if (!me) {
    return <div>Error: User not found!</div>;
  }

  const myreview = reviews.filter((r) => r.deliveryMenId === me._id);

  return (
    <div className="space-y-4 m-4">
      {myreview.length > 0 ? (
        myreview.map((mreview, index) => (
          <div
            key={index}
            className="review-card bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-4 border-l-4 border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center space-x-4">
              <img
                src={mreview.userImage || "https://via.placeholder.com/50"}
                alt="User"
                className="w-12 h-12 rounded-full border-2 border-gray-300 dark:border-gray-600"
              />
              <div>
                <p className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                  {mreview.userName || "User"}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Date: {mreview.date}
                </p>
              </div>
            </div>
  
            <div className="mt-4">
              <p className="font-semibold text-gray-900 dark:text-gray-200">
                Rating: {mreview.rating}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                <span className="font-bold text-gray-800 dark:text-gray-100">
                  Feedback:
                </span>{" "}
                {mreview.feedback}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400">
          No reviews found.
        </div>
      )}
    </div>
  );
  
  
};

export default Myreview;
