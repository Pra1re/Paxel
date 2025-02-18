import React, { useContext, useEffect, useState } from 'react';
import { authcontext } from '../provider/authprovider';
import User from './user';
import Admin from './admin';
import Loading from './loading';
import Deliveryman from './deliveryman';

const Dashboard = () => {
    const { user,role } = useContext(authcontext);

//console.log("Trying to find email =", user);



    return (
        <div>
        {role === "user" ? (
            <User />
        ) : role === "admin" ? (
            <Admin />
        ) : (
            <Deliveryman />
        )}
    </div>
    );
};

export default Dashboard;