import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import updateProfile from "../api/user/updateProfile";
import { UserContext } from "../shared/context";

const UpdateProfile = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [name, setName] = useState(user.full_name);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await updateProfile(name);
      setMessage("Your profile has been updated successfully");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <alert variant="danger">{error}</alert>}
          {message && <alert variant="success">{message}</alert>}
          <form onSubmit={handleSubmit}>
            <div className="row" id="email">
              <label>Email</label>
              <input type="email" value={user.mail} required disabled />
            </div>
            <div className="row" id="name">
              <label>Name</label>
              <input
                type="text"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></input>
            </div>
            <button disabled={loading} className="btn" type="submit">
              {loading ? "Loading" : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
      <div className="w-100 text-center mt-2">
        {user.role === "regular" ? (
          <Link to="/home">Go Back</Link>
        ) : (
          <Link to="/admin">Go Back</Link>
        )}
      </div>
    </>
  );
};

export default UpdateProfile;
