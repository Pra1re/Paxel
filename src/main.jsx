import { StrictMode, useContext } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import Authprovider, { authcontext } from "./provider/authprovider";
import Route from "./components/routes/router"; 

const App = () => {
  const { role } = useContext(authcontext); // Get role from context

  return (
    <>
      <Route role={role} />
      <ToastContainer />
    </>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Authprovider>
      <App />
    </Authprovider>
  </StrictMode>
);
