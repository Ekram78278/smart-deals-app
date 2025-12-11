import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "./AuthContext";

const privateRoute = ({ Children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (user && user?.email) {
    return Children;
  }
  return <Navigate state={location.pathname} to="/register"></Navigate>;
};

export default privateRoute;
