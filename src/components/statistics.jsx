import React, { useEffect, useState } from "react";
import Loading from "./loading";
import Chart from "react-apexcharts";

const Statistics = () => {
  const [parcels, setParcels] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    fetch("https://assignment-12-lovat.vercel.app/myparcel")
      .then((res) => res.json())
      .then((data) => {
        setParcels(data);
        setLoad(false);
      });
  }, []);

  if (load) {
    return <Loading />;
  }

 
  const bookingsByDate = parcels.reduce((acc, parcel) => {
    const date = parcel.bookingdate;
    acc[date] = acc[date] ? acc[date] + 1 : 1;
    return acc;
  }, {});

  
  const bookingDates = Object.keys(bookingsByDate);
  const bookingCounts = Object.values(bookingsByDate);

  
  const deliveredParcels = parcels.filter((p) => p.status === "Delivered");
  const deliveredByDate = deliveredParcels.reduce((acc, parcel) => {
    const date = parcel.bookingdate;
    acc[date] = acc[date] ? acc[date] + 1 : 1;
    return acc;
  }, {});

  const bookedVsDeliveredDates = [...new Set([...bookingDates, ...Object.keys(deliveredByDate)])].sort();
  const bookedCounts = bookedVsDeliveredDates.map((date) => bookingsByDate[date] || 0);
  const deliveredCounts = bookedVsDeliveredDates.map((date) => deliveredByDate[date] || 0);

  return (
    <div className="py-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
            App Usage Statistics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 max-w-6xl mx-auto">
            
            {/* Bookings by Date Chart */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200 text-center">
                    Bookings by Date
                </h3>
                <Chart
                    options={{
                        chart: {
                            type: "bar",
                            toolbar: {
                                show: true,
                                offsetY: -20,
                            },
                        },
                        xaxis: {
                            categories: bookingDates,
                        },
                        title: {
                            text: "Number of Bookings Per Date",
                            align: "center",
                        },
                    }}
                    series={[
                        {
                            name: "Bookings",
                            data: bookingCounts,
                        },
                    ]}
                    type="bar"
                    height={350}
                />
            </div>
            
            {/* Booked vs Delivered Parcels Chart */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200 text-center">
                    Booked vs Delivered Parcels
                </h3>
                <Chart
                    options={{
                        chart: {
                            type: "line",
                            toolbar: {
                                show: true,
                                offsetY: -20,
                            },
                        },
                        xaxis: {
                            categories: bookedVsDeliveredDates,
                        },
                        title: {
                            text: "Comparison of Booked vs Delivered Parcels",
                            align: "center",
                        },
                    }}
                    series={[
                        {
                            name: "Booked Parcels",
                            data: bookedCounts,
                        },
                        {
                            name: "Delivered Parcels",
                            data: deliveredCounts,
                        },
                    ]}
                    type="line"
                    height={350}
                />
            </div>
        </div>
    </div>
);

  
  
};

export default Statistics;
