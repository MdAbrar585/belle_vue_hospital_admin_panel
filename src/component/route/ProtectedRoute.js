import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { loginError, loginLoading, isAthenticate, user } = useSelector(
    (state) => state.login
  );
  const loggedInUser = localStorage.getItem("logggedInCheck");

  return (
    <Fragment>{loggedInUser ? <Outlet /> : <Navigate to="/login" />}</Fragment>
  );
};

export default ProtectedRoute;
