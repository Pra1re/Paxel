import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { useContext } from "react";
import { authcontext } from "../../provider/authprovider";

import Home from "../home";
import Layout from "../Layout";
import Login from "../login";
import Register from "../register";
import Forget from "../forget";
import DynamicTitle from "../dynamictitle";
import NotFound from "../notfound";
import Dashboard from "../dashboard";
import ParcelBooking from "../parcel";
import Userprofile from "../userprofile";
import MyParcel from "../myparcel";
import Manageparcels from '../manageparcels';
import Deliverytask from '../deliverytask';
import Privaterouter from './privaterouter'
import Statistics from '../statistics'
import Allparcels from "../allparcels";
import Alluser from "../alluser";
import Alldeliveryman from "../alldeliveryman";
import Loading from "../loading";
import Adminprofile from "../adminprofile";
import Myreview from "../myreview";
import PublicRoute from "../publicroute";
import Updateitem from "../updateitem";
const Route = ({ role })=> {
  //console.log("role in router = ",role);
const{roloading,setroloading}=useContext(authcontext)

if(roloading){
  return <Loading></Loading>
}


  let dashboardRoutes = [];

  if (role === "user") {
    dashboardRoutes = [
      { path: "", element: <DynamicTitle title="Profile"><Userprofile /></DynamicTitle> },
      { path: "profile", element: <DynamicTitle title="Profile"><Userprofile /></DynamicTitle> },
      { path: "book", element: <DynamicTitle title="Booking"><ParcelBooking /></DynamicTitle> },
      { path: "myparcel", element: <DynamicTitle title="My Parcels"><MyParcel /></DynamicTitle> },
      { path: "myparcel/updateitem/:id", element: <DynamicTitle title="My Parcels"><Updateitem></Updateitem></DynamicTitle> },
    ];
  } else if (role === "admin") {
    dashboardRoutes = [
      { path: "", element: <DynamicTitle title="Admin Dashboard"><Statistics></Statistics></DynamicTitle> },
      { path: "statistics", element: <DynamicTitle title="Admin Dashboard"><Statistics></Statistics></DynamicTitle> },
      { path: "allparcel", element: <DynamicTitle title="Admin Dashboard"><Allparcels></Allparcels></DynamicTitle> },
      { path: "alluser", element: <DynamicTitle title="Admin Dashboard"><Alluser/></DynamicTitle> },
      { path: "alldeliveryman", element: <DynamicTitle title="Admin Dashboard"><Alldeliveryman/></DynamicTitle> },
    ];
  } else if (role === "deliveryman") {
    dashboardRoutes = [
      { path: "", element: <DynamicTitle title="Delivery Dashboard"><Deliverytask /></DynamicTitle> },
      { path: "deliverylist", element: <DynamicTitle title="Delivery Dashboard"><Deliverytask /></DynamicTitle> },
      { path: "myreview", element: <DynamicTitle title="Delivery Dashboard"><Myreview/></DynamicTitle> },
    ];
  }








  const Jinx = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [

        { path: "/", element: <DynamicTitle title="Home"><Home /></DynamicTitle> },
        { path: "/login", element:<PublicRoute> <DynamicTitle title="Login"><Login /></DynamicTitle></PublicRoute> },
        { path: "/register", element: <PublicRoute><DynamicTitle title="Register"><Register /></DynamicTitle> </PublicRoute>},
        { path: "/forget", element: <Forget /> },
        { 
          path: "/dashboard",
          element: <Privaterouter><DynamicTitle title="Dashboard"><Dashboard /></DynamicTitle></Privaterouter>,
          children: dashboardRoutes,
        },
        { path: "*", element: <DynamicTitle title="Not Found"><NotFound /></DynamicTitle> },
      ],
    },
  ]);

  return <RouterProvider router={Jinx} />;
};

export default Route;
