import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const token = localStorage.getItem("authToken");
  console.log({ token });
  return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;
