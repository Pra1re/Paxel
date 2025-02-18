import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from './sidebar';

const Deliveryman = () => {
    return (
        <div className='flex '>
            <div className=''>
            <Sidebar/></div>
            <div className=' w-[90%] lg:w-[100%] '>
            <Outlet></Outlet></div>
            
        
            
        </div>
    );
};

export default Deliveryman;