import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  console.log(location);

if (loading){
  return <span className="loading loading-spinner text-success"></span>
};

  if (user){
  return children;
 }
  return <Navigate state={location?.pathname} to="/register"></Navigate>;
};

export default PrivateRoute;
