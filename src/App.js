import React, { useState, useMemo, useEffect } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import User from "./pages/user";
import UpdateProfile from "./pages/UpdateProfile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import LandPage from "./pages/LandPage";
import { tokenContext, UserContext, VacationContext } from "./shared/context";
import Navbar from "./components/Navbar";
import Admin from "./pages/admin/admin";
import Chart from "./pages/admin/Chart";
import AdminRoute from "./routes/AdminRoute";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const user_value = useMemo(() => ({ user, setUser }), [user, setUser]);

  const [vacations, setVacations] = useState();

  const vacation_value = useMemo(() => ({ vacations, setVacations }), [
    vacations,
    setVacations,
  ]);

  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

  const token_value = useMemo(() => ({ token, setToken }), [token, setToken]);

  useEffect(() => {
    let u = localStorage.getItem("user");
    let t = localStorage.getItem("token");
    if (u) {
      let tmp1 = JSON.parse(u);
      let tmp2 = JSON.parse(t);
      setUser(tmp1);
      setToken(tmp2);
    }
  }, [setUser]);

  return (
    <div className="App" style={{ minHeight: "100vh" }}>
      <UserContext.Provider value={user_value}>
        <tokenContext.Provider value={token_value}>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/" component={LandPage} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <VacationContext.Provider value={vacation_value}>
                <PrivateRoute
                  exact
                  path="/update-profile"
                  component={UpdateProfile}
                />
                <PrivateRoute exact path="/home" component={User} />
                <AdminRoute exact path="/admin" component={Admin} />
                <AdminRoute exact path="/chart" component={Chart} />
              </VacationContext.Provider>
            </Switch>
          </Router>
        </tokenContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
