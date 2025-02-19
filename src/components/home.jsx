import React, { useContext } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import { Outlet } from 'react-router-dom';
import Firstbanner from './firstbanner';

import WhyChooseUs from './why';
import { authcontext } from '../provider/authprovider';
import Features from './feature';
import Topdelman from './topdelman';
import FAQ from './faq';
import NewsletterSubscription from './newsletter';
import Newsletter from './newsletter';






const Home = () => {
  //console.log("role is = ",role,user);
    return (
        <div className=''>
            
            <Firstbanner></Firstbanner>
            <Features></Features>
            <Topdelman></Topdelman>
            <FAQ></FAQ>
            <Newsletter/>
            {/* <WhyChooseUs></WhyChooseUs> */}
            
            
           
            
            

        </div>
    );
};

export default Home;