import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { isLoggedIn } from "../auth/authtoken";

const PriavateRoute = () => {

    return isLoggedIn() ? <Outlet /> : <Navigate to={"/login"} />

}
export default PriavateRoute;