import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const Protected = () => {
  const {user,isLoading} = useSelector((state) => state.auth);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  console.log(user,"user in protected");

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
};

export default Protected;
