import React from "react";
import { Link } from "react-router-dom";

function LandPage() {
  return (
    <React.Fragment>
      <div className="container">
        <div
          className="row"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400&q=80)",
            width: "100%",
            height: "800px",
          }}
        >
          <div
            className="center"
            style={{ paddingTop: "65vh", color: "red", fontSize: "24px" }}
          >
            Explore The World With You'r Family With The Best Price
          </div>
          <div className="center" style={{ paddingTop: "3vh" }}>
            <Link
              className="waves-effect waves-light btn red darke-3"
              style={{ margin: "2em" }}
              to="/signup"
            >
              SignUp
            </Link>

            <Link
              className="waves-effect waves-light btn red darke-3"
              to="/login"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default LandPage;
