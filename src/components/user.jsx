import React from 'react';
import ParcelBooking from './parcel';
import Sidebar from './sidebar';
import { Outlet } from 'react-router';

const User = () => {
    return (
        <div className='flex '>
            <div className=''>
            <Sidebar/></div>
            <div className=' w-[90%] lg:w-[100%] '>
            <Outlet></Outlet></div>
            
        
            
        </div>
    );
};

export default User;