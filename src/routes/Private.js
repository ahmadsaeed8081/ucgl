import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Private = ({ children }) => {
  const { userToken } = useSelector((state) => state.globalReducer);

  return userToken ? children : <Navigate to="/" />;
};

export default Private;
