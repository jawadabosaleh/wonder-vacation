import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../shared/context";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} {...rest} /> : <Redirect to="/login" />
      }
    ></Route>
  );
};

export default PrivateRoute;
