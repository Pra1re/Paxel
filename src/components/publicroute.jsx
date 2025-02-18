import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { authcontext } from "../provider/authprovider";


const PublicRoute = ({ children }) => {
  const { user } = useContext(authcontext);

  return user ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
