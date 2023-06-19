import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Public = ({ children }) => {
  const { userToken } = useSelector((state) => state.globalReducer);

  return userToken ? <Navigate to="/dashboard/home" /> : children;
};

export default Public;
