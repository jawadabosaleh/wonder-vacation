import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import logout from "../api/auth/logout";
import M from "materialize-css";
import { UserContext } from "../shared/context";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    let elems = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(elems, { hover: false });
  }, [user]);

  return (
    <div>
      <div className="navbar-fixed">
        <ul id="dropdown1" className="dropdown-content">
          <li>
            <Link
              to="/"
              onClick={() => logout(setUser)}
              style={{ color: "red" }}
            >
              Logout
            </Link>
          </li>
          <li>
            <Link to="/update-profile"> update profile</Link>
          </li>
        </ul>
        <nav className="nav-wrapper red darken-3">
          <div className="container">
            <ul className="brand-logo center">
              <li>
                {!user && (
                  <Link to="/" style={{ fontSize: "26px" }}>
                    Wonder Vacations
                  </Link>
                )}
                {user && (
                  <Link to="/admin" style={{ fontSize: "26px" }}>
                    Vacations
                  </Link>
                )}
              </li>
            </ul>

            <ul className="right hide-on-med-and-down">
              {user ? (
                <>
                  {user.role === "admin" ? (
                    <>
                      <li>
                        <Link to="/admin">Home</Link>
                      </li>
                      <li>
                        {" "}
                        <Link to="/chart">Chart</Link>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link to="/home">Home</Link>
                    </li>
                  )}
                  <li>
                    <div className="dropdown-trigger" data-target="dropdown1">
                      {user.full_name}
                      <i className="large material-icons right">
                        account_circle
                      </i>
                    </div>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/signup">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
