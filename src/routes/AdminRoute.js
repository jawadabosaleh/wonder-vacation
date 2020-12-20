import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../shared/context";

const AdminRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user && user.role === "admin" ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/home" />
        )
      }
    ></Route>
  );
};

export default AdminRoute;
