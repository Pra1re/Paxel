import React from 'react';
import Sidebar from './sidebar';
import { Outlet } from 'react-router';

const Admin = () => {
    return (
        <div className='flex '>
            <div className=''>
            <Sidebar/></div>
            <div className=' w-[90%] lg:w-[100%] '>
            <Outlet></Outlet></div>
            
        
            
        </div>
    );
};

export default Admin;